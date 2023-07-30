package routes

import (
	"waysfood/handlers"
	"waysfood/pkg/middleware"
	"waysfood/pkg/mysql"
	"waysfood/repositories"

	"github.com/labstack/echo/v4"
)

func UserRoutes(e *echo.Group) {
	userRepository := repositories.RepositoryUser(mysql.DB)
	h := handlers.HandlerUser(userRepository)

	e.GET("/users", (h.FindUsers))
	e.GET("/user/:id", (h.GetUser))
	e.PATCH("/user/:id", (middleware.UploadFile(h.UpdateUser)))
	e.DELETE("/user/:id", h.DeleteUser)
}
