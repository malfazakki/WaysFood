package handlers

import (
	"net/http"
	"strconv"
	"time"
	dto "waysfood/dto/result"
	transactiondto "waysfood/dto/transaction"
	"waysfood/models"
	"waysfood/repositories"

	"github.com/go-playground/validator"
	"github.com/golang-jwt/jwt/v4"
	"github.com/labstack/echo/v4"
)

type handlerTransaction struct {
	TransactionRepository repositories.TransactionRepository
}

func HandlerTransaction(TransactionRepository repositories.TransactionRepository) *handlerTransaction {
	return &handlerTransaction{TransactionRepository}
}

func (h *handlerTransaction) FindTransactions(c echo.Context) error {
	transactions, err := h.TransactionRepository.FindTransactions()
	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: transactions})
}

func (h *handlerTransaction) UserTransactions(c echo.Context) error {
	userID := int(c.Get("userLogin").(jwt.MapClaims)["id"].(float64))

	transactions, err := h.TransactionRepository.UserTransactions(userID)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: transactions})
}

func (h *handlerTransaction) GetTransaction(c echo.Context) error {
	id, _ := strconv.Atoi(c.Param("id"))

	product, err := h.TransactionRepository.GetTransaction(int(id))
	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: product})
}

func (h *handlerTransaction) CreateTransaction(c echo.Context) error {
	request := new(transactiondto.TransactionRequest)

	err := c.Bind(request)
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	validation := validator.New()
	error := validation.Struct(request)
	if error != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
	}

	userId := c.Get("userLogin").(jwt.MapClaims)["id"].(float64)
	var transactionIsMatch = false
	var transactionId int
	for !transactionIsMatch {
		transactionId = int(time.Now().Unix())
		transactionData, _ := h.TransactionRepository.GetTransaction(transactionId)
		if transactionData.ID == 0 {
			transactionIsMatch = true
		}
	}

	transaction := models.Transaction{
		ID:        transactionId,
		UserID:    int(userId),
		ProductID: request.ProductID,
	}

	transaction, err = h.TransactionRepository.CreateTransaction(transaction)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
	}
	transaction, _ = h.TransactionRepository.GetTransaction(transaction.ID)

	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: transaction})
}

func (h *handlerTransaction) DeleteTransaction(c echo.Context) error {
	id, _ := strconv.Atoi(c.Param("id"))

	transaction, err := h.TransactionRepository.GetTransaction(id)
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	data, err := h.TransactionRepository.DeleteTransaction(transaction, id)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{
			Code: http.StatusInternalServerError, Message: err.Error()})
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: data})
}

// CREATE TRANSACTION MIDTRANS

// func (h *handlerTransaction) CreateTransactionMidtrans(c echo.Context) error {
// 	request := new(transactiondto.TransactionRequestMidtrans)

// 	err := c.Bind(request)
// 	if err != nil {
// 		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
// 	}

// 	validation := validator.New()
// 	error := validation.Struct(request)
// 	if error != nil {
// 		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
// 	}

// 	var s = snap.Client{}
// 	s.New(os.Getenv("SERVER_KEY"), midtrans.Sandbox)

// 	req := &snap.Request{
// 		TransactionDetails: midtrans.TransactionDetails{
// 			OrderID:  request.ID,
// 			GrossAmt: int64(request.Price),
// 		},
// 		CreditCard: &snap.CreditCardDetails{
// 			Secure: true,
// 		},
// 		CustomerDetail: &midtrans.CustomerDetails{
// 			FName: request.FullName,
// 			Email: request.Email,
// 		},
// 	}

// 	// 3. execute request create snap transaction to midtrans snap api
// 	snapResp, _ := s.CreateTransaction(req)

// 	return c.JSON(http.StatusOK, dto.SuccessResult{Message: "success", Data: snapResp})
// }

// func (h *handlerTransaction) Notification(c echo.Context) error {
// 	var notificationPayload map[string]interface{}

// 	if err := c.Bind(&notificationPayload); err != nil {
// 		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
// 	}

// 	transactionStatus := notificationPayload["transaction_status"].(string)
// 	fraudStatus := notificationPayload["fraud_status"].(string)
// 	orderId := notificationPayload["order_id"].(string)

// 	order_id, _ := strconv.Atoi(orderId)
// 	transaction, _ := h.TransactionRepository.GetTransaction(order_id)

// 	if transactionStatus == "capture" {
// 		if fraudStatus == "challenge" {
// 			h.TransactionRepository.UpdateTransaction("pending", order_id)
// 		} else if fraudStatus == "accept" {
// 			SendMail("success", transaction)
// 			h.TransactionRepository.UpdateTransaction("approved", order_id)
// 		}
// 	} else if transactionStatus == "settlement" {
// 		SendMail("success", transaction)
// 		h.TransactionRepository.UpdateTransaction("approved", order_id)
// 	} else if transactionStatus == "deny" {
// 		h.TransactionRepository.UpdateTransaction("failed", order_id)
// 	} else if transactionStatus == "cancel" || transactionStatus == "expire" {
// 		h.TransactionRepository.UpdateTransaction("failed", order_id)
// 	} else if transactionStatus == "pending" {
// 		h.TransactionRepository.UpdateTransaction("pending", order_id)
// 	}

// 	return c.JSON(http.StatusOK, dto.SuccessMidtransResult{Code: http.StatusOK, Data: notificationPayload})
// }

// func SendMail(status string, transaction models.Transaction) {

// 	if status != transaction.Status && (status == "success") {
// 		var CONFIG_SMTP_HOST = "smtp.gmail.com"
// 		var CONFIG_SMTP_PORT = 587
// 		var CONFIG_SENDER_NAME = "Malfazakki <malfazakki@gmail.com>"
// 		var CONFIG_AUTH_EMAIL = os.Getenv("EMAIL_SYSTEM")
// 		var CONFIG_AUTH_PASSWORD = os.Getenv("PASSWORD_SYSTEM")

// 		var productName = transaction.Ticket.NameTrain
// 		var price = strconv.Itoa(transaction.Ticket.Price)

// 		mailer := gomail.NewMessage()
// 		mailer.SetHeader("From", CONFIG_SENDER_NAME)
// 		mailer.SetHeader("To", transaction.User.Email)
// 		mailer.SetHeader("Subject", "Transaction Status")
// 		mailer.SetBody("text/html", fmt.Sprintf(`<!DOCTYPE html>
//     <html lang="en">
//       <head>
//       <meta charset="UTF-8" />
//       <meta http-equiv="X-UA-Compatible" content="IE=edge" />
//       <meta name="viewport" content="width=device-width, initial-scale=1.0" />
//       <title>Document</title>
//       <style>
//         h1 {
//         color: brown;
//         }
//       </style>
//       </head>
//       <body>
//       <h2>Product payment :</h2>
//       <ul style="list-style-type:none;">
//         <li>Train Name : %s</li>
//         <li>Total payment: Rp.%s</li>
//         <li>Status : <b>%s</b></li>
//       </ul>
//       </body>
//     </html>`, productName, price, status))

// 		dialer := gomail.NewDialer(
// 			CONFIG_SMTP_HOST,
// 			CONFIG_SMTP_PORT,
// 			CONFIG_AUTH_EMAIL,
// 			CONFIG_AUTH_PASSWORD,
// 		)

// 		err := dialer.DialAndSend(mailer)
// 		if err != nil {
// 			log.Fatal(err.Error())
// 		}

// 		log.Println("Mail sent! to " + transaction.User.Email)
// 	}
// }
