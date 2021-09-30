-- CreateTable
CREATE TABLE `CASAS` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `fechaCreacion` DATETIME(3) NOT NULL,
    `numeroCuartos` INTEGER NOT NULL,
    `numeroBanios` INTEGER NOT NULL,
    `color` VARCHAR(191) NOT NULL,
    `numeroPisos` INTEGER NOT NULL,
    `precio` DOUBLE NOT NULL,
    `sector` VARCHAR(191) NOT NULL,
    `disponibilidad` BOOLEAN NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
