package authdto

type LoginResponse struct {
	Username string `json:"username"`
	Password string `json:"-"`
	Token    string `json:"token"`
	Role     string `json:"role"`
	ID       int    `json:"id"`
	Image    string `json:"image"`
}
