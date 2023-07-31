package usersdto

type UpdateUserRequest struct {
	Email     string `json:"email" form:"email" gorm:"type: varchar(255)"`
	Password  string `json:"password" form:"password" gorm:"type: varchar(255)"`
	Username  string `json:"username" form:"username" gorm:"type: varchar(255)"`
	Phone     string `json:"phone" form:"phone" gorm:"type: varchar(255)"`
	Role      string `json:"role" form:"role" gorm:"type: varchar(255)"`
	Latitude  string `json:"latitude" form:"latitude" gorm:"type: double"`
	Longitude string `json:"longitude" form:"longitude" gorm:"type: double"`
	Image    string `json:"image" form:"image" gorm:"type: varchar(255)"`
}
