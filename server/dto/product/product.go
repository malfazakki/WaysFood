package productdto

type CreateProductRequest struct {
	Name  string `json:"name" form:"name" validate:"required"`
	Price int    `json:"price" form:"price" validate:"required"`
	Image string `json:"image" form:"image" validate:"required"`
}

type UpdateProductRequest struct {
	Name  string `json:"name" form:"name" validate:"required"`
	Price int    `json:"price" form:"price" validate:"required"`
	Image string `json:"image" form:"image"`
}
