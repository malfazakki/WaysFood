package models

type Transaction struct {
	ID        int                        `json:"id" gorm:"primary_key"`
	UserID    int                        `json:"user_id" form:"user_id" gorm:"type: int"`
	User      UserProductResponse        `json:"user"`
	ProductID int                        `json:"product_id" form:"product_id" gorm:"type: int; onDelete:CASCADE; onUpdate:CASCADE;"`
	Product   ProductTransactionResponse `json:"product"`
	Status    string                     `json:"status" form:"status" gorm:"default: 'pending'"`
}
