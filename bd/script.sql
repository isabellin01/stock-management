CREATE DATABASE IF NOT EXISTS `stockclee`;
USE `stockclee`;
-- -----------------------------------------------------
-- Table `stockclee`.`product`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `stockclee`.`product` (
  `idproduct` INT AUTO_INCREMENT,
  `product_code` VARCHAR(5),
  `description` VARCHAR(150),
  `category` VARCHAR(45),
  PRIMARY KEY (`idproduct`));

-- -----------------------------------------------------
-- Table `stockclee`.`partner`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `stockclee`.`partner` (
  `idclient` INT AUTO_INCREMENT,
  `name` VARCHAR(45),
  `partner_type` VARCHAR(20),
  PRIMARY KEY (`idclient`));

-- -----------------------------------------------------
-- Table `stockclee`.`invoice`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `stockclee`.`invoice` (
  `idinvoice` INT AUTO_INCREMENT,
  `idpartner` INT,
  `nf_number` VARCHAR(45),
  `icms_value` DECIMAL,
  `issue_date` DATE,
  `due_date` DATE,
  `order_number` VARCHAR(45),
  `dplbol` TINYINT,
  `payment` TINYINT,
  PRIMARY KEY (`idinvoice`),
  CONSTRAINT `fk_invoice_partner1`
    FOREIGN KEY (`idpartner`)
    REFERENCES `stockclee`.`partner` (`idclient`));

-- -----------------------------------------------------
-- Table `stockclee`.`product_stock`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `stockclee`.`product_stock` (
  `idproduct_stock` INT AUTO_INCREMENT,
  `idproduct` INT,
  `current_quantity` INT,
  `date_stock` DATE,
  PRIMARY KEY (`idproduct_stock`, `idproduct`),
  CONSTRAINT `fk_product_stock_product1`
    FOREIGN KEY (`idproduct`)
    REFERENCES `stockclee`.`product` (`idproduct`));

-- -----------------------------------------------------
-- Table `stockclee`.`stock_movement`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `stockclee`.`stock_movement` (
  `idstock_movement` INT AUTO_INCREMENT,
  `idproduct` INT,
  `idpartner` INT,
  `quantity` INT,
  `date` DATE,
  PRIMARY KEY (`idstock_movement`, `idproduct`, `idpartner`),
  CONSTRAINT `fk_parceiro_has_produto_produto1`
    FOREIGN KEY (`idproduct`)
    REFERENCES `stockclee`.`product` (`idproduct`),
  CONSTRAINT `fk_stock_movement_partner1`
    FOREIGN KEY (`idpartner`)
    REFERENCES `stockclee`.`partner` (`idclient`));

-- -----------------------------------------------------
-- Table `stockclee`.`invoice_item`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `stockclee`.`invoice_item` (
  `idinvoice_item` INT AUTO_INCREMENT,
  `idproduct` INT,
  `idinvoice` INT,
  `value` DECIMAL,
  `quantity` INT,
  PRIMARY KEY (`idinvoice_item`, `idproduct`, `idinvoice`),
  CONSTRAINT `fk_produto_has_notafiscal_produto1`
    FOREIGN KEY (`idproduct`)
    REFERENCES `stockclee`.`product` (`idproduct`),
  CONSTRAINT `fk_produto_has_notafiscal_notafiscal1`
    FOREIGN KEY (`idinvoice`)
    REFERENCES `stockclee`.`invoice` (`idinvoice`));

-- -----------------------------------------------------
-- Table `stockclee`.`product_ca`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `stockclee`.`product_ca` (
  `idproduct_ca` INT AUTO_INCREMENT,
  `idproduct` INT,
  `current_ca` VARCHAR(45),
  `date_ca` DATE,
  PRIMARY KEY (`idproduct_ca`, `idproduct`),
  CONSTRAINT `fk_product_ca_product1`
    FOREIGN KEY (`idproduct`)
    REFERENCES `stockclee`.`product` (`idproduct`));

-- INSERINDO DADOS NO PRODUTOS
INSERT INTO product (`product_code`, `description`, `category`) VALUES
('001', 'MÁSCARA', 'EPI'),('002', 'AVENTAL PLÁSTICO', 'EPI'),
('003', 'BOTA COURO', 'EPI'),('004', 'BOTA PVC', 'EPI'),
('005', 'CALÇA', 'EPI'),('006', 'CAMISA', 'EPI'),
('007', 'CAPACETE', 'EPI'),('008', 'CAPA CHUVA', 'EPI'),
('009', 'CATRACA CAPACETE', 'EPI'),('010', 'FILTRO QUÍMICO', 'EPI'),
('011', 'LUVA DE RASPA', 'EPI'),('012', 'LUVA ALGODÃO', 'EPI'),
('013', 'LUVA PVC', 'EPI'),('014', 'LUVA VAQUETA', 'EPI'),
('015', 'LUVA VOLK AZUL/PRETO', 'EPI'),('016', 'MACACÃO BRANCO', 'EPI'),
('017', 'MÁSCARA DE GÁS', 'EPI'),('018', 'ÓCULOS', 'EPI'),
('019', 'PROT. AURICULAR', 'EPI'),('020', 'TOUCA TECIDO', 'EPI'),
('021', 'VISEIRA', 'EPI');



-- TEST
select * from product;
truncate table product;
set FOREIGN_KEY_CHECKS = 1;