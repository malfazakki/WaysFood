package handlers

import (
	"net/http"
	"strconv"
	dto "waysfood/dto/result"
	usersdto "waysfood/dto/users"
	"waysfood/repositories"

	"github.com/go-playground/validator"
	"github.com/labstack/echo/v4"
)

type handlerUser struct {
	UserRepository repositories.UserRepository
}

func HandlerUser(UserRepository repositories.UserRepository) *handlerUser {
	return &handlerUser{UserRepository}
}

func (h *handlerUser) FindUsers(c echo.Context) error {
	users, err := h.UserRepository.FindUsers()
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	for i, u := range users {
		users[i].Image = Path_file + u.Image
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: users})
}

func (h *handlerUser) GetUser(c echo.Context) error {
	id, _ := strconv.Atoi(c.Param("id"))

	user, err := h.UserRepository.GetUser(id)
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	// user.Image = Path_file + user.Image

	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: user})
}

func (h *handlerUser) UpdateUser(c echo.Context) error {
	dataFile := c.Get("dataFile").(string)

	request := usersdto.UpdateUserRequest{
		Username:  c.FormValue("username"),
		Email:     c.FormValue("email"),
		Phone:     c.FormValue("phone"),
		Latitude:  c.FormValue("latitude"),
		Longitude: c.FormValue("longitude"),
		Image:     dataFile,
	}
	
	validation := validator.New()
	err := validation.Struct(request)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
	}

	id, _ := strconv.Atoi(c.Param("id"))
	user, err := h.UserRepository.GetUser(id)

	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	if request.Email != "" {
		user.Email = request.Email
	}
	if request.Password != "" {
		user.Password = request.Password
	}
	if request.Username != "" {
		user.Username = request.Username
	}
	if request.Gender != "" {
		user.Gender = request.Gender
	}
	if request.Phone != "" {
		user.Phone = request.Phone
	}
	if request.Latitude != "" {
		user.Latitude = request.Latitude
	}
	if request.Longitude != "" {
		user.Longitude = request.Longitude
	}
	if request.Image != "" {
		user.Image = request.Image
	}

	data, err := h.UserRepository.UpdateUser(user)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: data})
}

func (h *handlerUser) DeleteUser(c echo.Context) error {
	id, _ := strconv.Atoi(c.Param("id"))

	user, err := h.UserRepository.GetUser(id)
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	data, err := h.UserRepository.DeleteUser(user, id)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: data})
}
