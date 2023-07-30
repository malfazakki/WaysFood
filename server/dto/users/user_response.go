package usersdto

type UserResponse struct {
	Email     string `json:"email"`
	Username  string `json:"username"`
	Gender    string `json:"gender"`
	Phone     string `json:"phone"`
	Role      string `json:"role"`
	Latitude  string `json:"latitude"`
	Longitude string `json:"longitude"`
	Image     string `json:"image"`
}
