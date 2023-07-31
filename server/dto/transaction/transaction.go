package transactiondto

import "waysfood/models"

type TransactionRequest struct {
	ID        int `json:"id" gorm:"primary_key"`
	ProductID int `json:"product_id" form:"product_id" gorm:"type: int" validate:"required"`
}

type TransactionRequestMidtrans struct {
	ID        string `json:"transaction_id" gorm:"primary_key"`
	Latitude  string `json:"latitude"`
	Longitude string `json:"longitude"`
}

type TransactionResponse struct {
	ID        int                               `json:"id"`
	UserID    int                               `json:"user_id"`
	User      models.UserProductResponse        `json:"user"`
	ProductID int                               `json:"product_id"`
	Product   models.ProductTransactionResponse `json:"product"`
	Status    string                            `json:"status"`
}
