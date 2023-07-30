package repositories

import (
	"errors"
	"waysfood/models"

	"gorm.io/gorm"
)

type AuthRepository interface {
	Register(user models.User) (models.User, error)
	IsEmailOrUsernameTaken(email, username string) (bool, bool, error)
	Login(username string) (models.User, error)
	CheckAuth(ID int) (models.User, error)
}

func RepositoryAuth(db *gorm.DB) *repository {
	return &repository{db}
}

func (r *repository) Register(user models.User) (models.User, error) {
	err := r.db.Create(&user).Error

	return user, err
}

func (r *repository) IsEmailOrUsernameTaken(email, username string) (bool, bool, error) {
	var user models.User

	// Check if the email exists in the database
	if email != "" {
		if err := r.db.Where("email = ?", email).First(&user).Error; err == nil {
			return true, false, nil // Email is taken
		} else if !errors.Is(err, gorm.ErrRecordNotFound) {
			return false, false, err // Other database error
		}
	}

	// Check if the username exists in the database
	if username != "" {
		if err := r.db.Where("username = ?", username).First(&user).Error; err == nil {
			return false, true, nil // Username is taken
		} else if !errors.Is(err, gorm.ErrRecordNotFound) {
			return false, false, err // Other database error
		}
	}

	// Both email and username are unique
	return false, false, nil
}

func (r *repository) Login(username string) (models.User, error) {
	var user models.User
	err := r.db.First(&user, "username=?", username).Error

	return user, err
}

func (r *repository) CheckAuth(ID int) (models.User, error) {
	var user models.User
	err := r.db.First(&user, ID).Error

	return user, err
}
