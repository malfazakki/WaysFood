package routes

import (
	"waysfood/handlers"
	"waysfood/pkg/middleware"
	"waysfood/pkg/mysql"
	"waysfood/repositories"

	"github.com/labstack/echo/v4"
)

func TransactionRoutes(e *echo.Group) {
	transactionRepository := repositories.RepositoryTransaction(mysql.DB)
	h := handlers.HandlerTransaction(transactionRepository)

	e.GET("/transactions", middleware.Auth(h.FindTransactions))
	e.GET("/transaction/:id", middleware.Auth(h.GetTransaction))
	e.POST("/transaction", middleware.Auth(h.CreateTransaction))
	e.POST("/transaction/midtrans", middleware.Auth(h.CreateTransactionMidtrans))
	e.GET("/user-transactions", middleware.Auth(h.UserTransactions))
	e.DELETE("/transaction/:id", middleware.Auth(h.DeleteTransaction))
	e.POST("/notification", h.Notification)
}
