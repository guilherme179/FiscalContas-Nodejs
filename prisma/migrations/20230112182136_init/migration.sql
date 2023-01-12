-- CreateTable
CREATE TABLE `Providers` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `cnpj` VARCHAR(18) NOT NULL,
    `phone` VARCHAR(15) NOT NULL,
    `cep` VARCHAR(9) NOT NULL,
    `street` VARCHAR(150) NOT NULL,
    `numberHouse` VARCHAR(11) NOT NULL,
    `district` VARCHAR(150) NOT NULL,
    `city` VARCHAR(150) NOT NULL,
    `state` VARCHAR(5) NOT NULL,
    `providersSince` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Providers_email_key`(`email`),
    UNIQUE INDEX `Providers_cnpj_key`(`cnpj`),
    UNIQUE INDEX `Providers_phone_key`(`phone`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
