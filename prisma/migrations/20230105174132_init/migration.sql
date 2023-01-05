-- CreateTable
CREATE TABLE `Client` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `cnpj` VARCHAR(18) NOT NULL,
    `phone` VARCHAR(15) NOT NULL,
    `price` VARCHAR(13) NOT NULL,
    `cep` VARCHAR(9) NOT NULL,
    `street` VARCHAR(150) NOT NULL,
    `numberHouse` VARCHAR(11) NOT NULL,
    `district` VARCHAR(150) NOT NULL,
    `city` VARCHAR(150) NOT NULL,
    `state` VARCHAR(5) NOT NULL,
    `customerSince` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Client_email_key`(`email`),
    UNIQUE INDEX `Client_cnpj_key`(`cnpj`),
    UNIQUE INDEX `Client_phone_key`(`phone`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
