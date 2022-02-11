CREATE Table usuario(
    `id` INT(11) NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(20) NOT NULL,
    `password` VARCHAR(60) NOT NULL,
    `email` VARCHAR(30) NOT NULL,
    PRIMARY KEY(`id`)
);

CREATE Table tarea(
    `id` INT(11) NOT NULL AUTO_INCREMENT,
    `titulo` VARCHAR(100) NOT NULL,
    `descripcion` TEXT,
    `fecha` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `usuario_Id` INT(11),
    CONSTRAINT `fk_usuario` FOREIGN KEY (`usuario_Id`) REFERENCES usuario(`id`),
    PRIMARY KEY(`id`)
)