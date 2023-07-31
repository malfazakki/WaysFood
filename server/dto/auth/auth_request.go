package authdto

type AuthRequest struct {
	Email     string `json:"email" form:"email" gorm:"type: varchar(255)" validate:"required"`
	Password  string `json:"password" form:"password" gorm:"type: varchar(255)" validate:"required"`
	Username  string `json:"username" form:"username" gorm:"type: varchar(255)" validate:"required"`
	Phone     string `json:"phone" form:"phone" gorm:"type: varchar(255)" validate:"required"`
	Role      string `json:"role" form:"role" gorm:"type: varchar(255)" validate:"required"`
	Latitude  string `json:"latitude" form:"latitude" gorm:"type: double"`
	Longitude string `json:"longitude" form:"longitude" gorm:"type: double"`
	Image    string `json:"image" form:"image" gorm:"type: varchar(255)"`
}

type LoginRequest struct {
	Username string `json:"username" form:"username" validate:"required"`
	Password string `json:"password" form:"password" validate:"required"`
}
