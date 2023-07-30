package models

type Product struct {
	ID     int                 `json:"id" gorm:"primary_key:auto_increment;"`
	Name   string              `json:"name" form:"name" gorm:"type: varchar(255)"`
	Price  int                 `json:"price" form:"price" gorm:"type: int"`
	Image  string              `json:"image" form:"image" gorm:"type: varchar(255)"`
	UserID int                 `json:"user_id" form:"user_id" gorm:"type: int"`
	User   UserProductResponse `json:"user"`
}

type ProductTransactionResponse struct {
	ID    int    `json:"id"`
	Name  string `json:"name"`
	Price int    `json:"price"`
	Image string `json:"image"`
}

func (ProductTransactionResponse) TableName() string {
	return "products"
}
