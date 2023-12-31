package database

import (
	"fmt"
	"waysfood/models"
	"waysfood/pkg/mysql"
)

func RunMigration() {
	err := mysql.DB.AutoMigrate(
		&models.User{},
		&models.Product{},
		&models.Transaction{},
	)

	if err != nil {
		fmt.Println(err)
		panic("migration failed")
	}

	fmt.Println("migration success")
}
