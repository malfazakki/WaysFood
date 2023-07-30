package handlers

import (
	"net/http"
	"os"
	"strconv"
	productdto "waysfood/dto/product"
	dto "waysfood/dto/result"
	"waysfood/models"
	"waysfood/repositories"

	"github.com/go-playground/validator"
	"github.com/golang-jwt/jwt/v4"
	"github.com/labstack/echo/v4"
)

var Path_file = os.Getenv("PATH_FILE")

type handlerProduct struct {
	ProductRepository repositories.ProductRepository
}

func HandlerProduct(ProductRepository repositories.ProductRepository) *handlerProduct {
	return &handlerProduct{ProductRepository}
}

func (h *handlerProduct) FindProducts(c echo.Context) error {
	products, err := h.ProductRepository.FindProducts()
	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
	}

	for i, p := range products {
		products[i].Image = Path_file + p.Image
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: products})
}

func (h *handlerProduct) GetProduct(c echo.Context) error {
	id, _ := strconv.Atoi(c.Param("id"))

	var product models.Product
	product, err := h.ProductRepository.GetProduct(id)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
	}

	product.Image = Path_file + product.Image

	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: product})
}

func (h *handlerProduct) CreateProduct(c echo.Context) error {
	var err error
	dataFile := c.Get("dataFile").(string)

	price, _ := strconv.Atoi(c.FormValue("price"))

	request := productdto.CreateProductRequest{
		Name:  c.FormValue("name"),
		Price: price,
		Image: dataFile,
	}

	validation := validator.New()
	err = validation.Struct(request)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
	}

	userId := c.Get("userLogin").(jwt.MapClaims)["id"].(float64)

	product := models.Product{
		Name:   request.Name,
		Price:  request.Price,
		Image:  request.Image,
		UserID: int(userId),
	}

	product, err = h.ProductRepository.CreateProduct(product)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
	}

	product, _ = h.ProductRepository.GetProduct(product.ID)

	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: product})
}

func (h *handlerProduct) UpdateProduct(c echo.Context) error {
	var err error
	dataFile := c.Get("dataFile").(string)

	price, _ := strconv.Atoi(c.FormValue("price"))

	request := productdto.UpdateProductRequest{
		Name:  c.FormValue("name"),
		Price: price,
		Image: dataFile,
	}

	id, _ := strconv.Atoi(c.Param("id"))
	product, err := h.ProductRepository.GetProduct(id)

	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	if request.Name != "" {
		product.Name = request.Name
	}
	if request.Price != 0 {
		product.Price = request.Price
	}
	if request.Image != "" {
		product.Image = request.Image
	}

	data, err := h.ProductRepository.UpdateProduct(product)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: data})
}

func (h *handlerProduct) DeleteProduct(c echo.Context) error {
	id, _ := strconv.Atoi(c.Param("id"))

	product, err := h.ProductRepository.GetProduct(id)
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	data, err := h.ProductRepository.DeleteProduct(product, id)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: data})
}
