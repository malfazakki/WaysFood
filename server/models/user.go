package models

type User struct {
	ID        int    `json:"id" gorm:"primary_key"`
	Email     string `json:"email" gorm:"type:varchar(255) unique"`
	Password  string `json:"password" gorm:"type:varchar(255)"`
	Username  string `json:"username" gorm:"type:varchar(255); unique"`
	Gender    string `json:"gender" gorm:"type:varchar(255)"`
	Phone     string `json:"phone" gorm:"type:varchar(255)"`
	Role      string `json:"role" gorm:"default:'user'"`
	Latitude  string `json:"latitude" gorm:"type:varchar(255)"`
	Longitude string `json:"longitude" gorm:"type:varchar(255)"`
	Image    string `json:"image" form:"image" gorm:"type:varchar(255)"`
}

type UserProductResponse struct {
	ID        int    `json:"id"`
	Username  string `json:"username"`
	Email     string `json:"email"`
	Phone     string `json:"phone"`
	Latitude  string `json:"latitude"`
	Longitude string `json:"longitude"`
}

func (u User) ToUserProductResponse() UserProductResponse {
	return UserProductResponse{
		ID:        u.ID,
		Username:  u.Username,
		Email:     u.Email,
		Phone:     u.Phone,
		Latitude:  u.Latitude,
		Longitude: u.Longitude,
	}
}

func (UserProductResponse) TableName() string {
	return "users"
}
