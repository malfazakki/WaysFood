package repositories

import (
	"waysfood/models"

	"gorm.io/gorm"
)

type TransactionRepository interface {
	FindTransactions() ([]models.Transaction, error)
	GetTransaction(ID int) (models.Transaction, error)
	CreateTransaction(transaction models.Transaction) (models.Transaction, error)
	UserTransactions(UserID int) ([]models.Transaction, error)
	DeleteTransaction(transaction models.Transaction, ID int) (models.Transaction, error)
	UpdateTransaction(status string, orderID int) (models.Transaction, error)
	GetUserTransaction(ID int) (models.User, error)
	UpdateUserTransaction(user models.User) (models.User, error)
}

func RepositoryTransaction(db *gorm.DB) *repository {
	return &repository{db}
}

func (r *repository) FindTransactions() ([]models.Transaction, error) {
	var transactions []models.Transaction
	err := r.db.Preload("User").Preload("Product").Preload("Product.User").Find(&transactions).Error

	return transactions, err
}

func (r *repository) UserTransactions(UserID int) ([]models.Transaction, error) {
	var transactions []models.Transaction

	err := r.db.Preload("User").Preload("Product").Preload("Product.User").Where("user_id = ?", UserID).Find(&transactions).Error

	return transactions, err
}

func (r *repository) GetTransaction(ID int) (models.Transaction, error) {
	var transaction models.Transaction
	err := r.db.Preload("User").Preload("Product").Preload("Product.User").First(&transaction, ID).Error

	return transaction, err
}

func (r *repository) CreateTransaction(transaction models.Transaction) (models.Transaction, error) {
	err := r.db.Create(&transaction).Error

	return transaction, err
}

func (r *repository) DeleteTransaction(transaction models.Transaction, ID int) (models.Transaction, error) {
	err := r.db.Delete(&transaction, ID).Scan(&transaction).Error

	return transaction, err
}

func (r *repository) UpdateTransaction(status string, orderID int) (models.Transaction, error) {
	var transaction models.Transaction
	r.db.First(&transaction, orderID)

	transaction.Status = status
	err := r.db.Save(&transaction).Error
	return transaction, err
}

func (r *repository) GetUserTransaction(ID int) (models.User, error) {
	var user models.User
	err := r.db.First(&user, ID).Error

	return user, err
}

func (r *repository) UpdateUserTransaction(user models.User) (models.User, error) {
	err := r.db.Save(&user).Error

	return user, err
}
