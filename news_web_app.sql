-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: db:3306
-- Generation Time: Oct 07, 2024 at 01:07 PM
-- Server version: 8.4.0
-- PHP Version: 8.2.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `news_web_app`
--

-- --------------------------------------------------------

--
-- Table structure for table `Admin`
--

CREATE TABLE `Admin` (
  `Adm_Id` int NOT NULL,
  `Adm_Fname` varchar(50) NOT NULL,
  `Adm_Lname` varchar(50) NOT NULL,
  `Adm_Username` varchar(20) NOT NULL,
  `Adm_Password` varchar(20) NOT NULL,
  `Adm_Email` varchar(50) NOT NULL,
  `Adm_Phone` varchar(15) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `Admin`
--

INSERT INTO `Admin` (`Adm_Id`, `Adm_Fname`, `Adm_Lname`, `Adm_Username`, `Adm_Password`, `Adm_Email`, `Adm_Phone`) VALUES
(16, 'aasdad', 'aaaaaaa', 'abcd', '1234', 'abcd@gmail.com', '0980960857'),
(27, 'aasdad', 'qdqwdqd', 'abcdefg', '123456', 'abcdef@gmail.com', '0987654321'),
(45, 'asdasdasd', 'asdasdasd', 'abcdefgh', 'asdasdads', 'abcdefgh@gmail.com', '0980960855'),
(49, 'ฟหกดฟหกดฟด', 'ฟกหดฟหกดฟกหด', 'sdafasdf', 'fdasafdsafds', 'asdfadsfasdf@gmail.com', '0891867731'),
(50, 'ไพศาล', 'กันกัน', 'paisal', '123456', 'paisal@gmail.com', '0230561654');

-- --------------------------------------------------------

--
-- Table structure for table `Category`
--

CREATE TABLE `Category` (
  `Cat_Id` int NOT NULL,
  `Cat_Name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `Category`
--

INSERT INTO `Category` (`Cat_Id`, `Cat_Name`) VALUES
(6, 'กีฬา'),
(7, 'การเมือง'),
(8, 'เศรษฐกิจ'),
(9, 'สุขภาพ'),
(10, 'เกมส์'),
(11, 'ต่างประเทศ'),
(19, 'อุบัติเหตุ'),
(22, 'อาชญากรรม'),
(24, 'ภัยธรรมชาติ');

-- --------------------------------------------------------

--
-- Table structure for table `Favorite_Category`
--

CREATE TABLE `Favorite_Category` (
  `Mem_Id` int NOT NULL,
  `Cat_Id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `Favorite_Category`
--

INSERT INTO `Favorite_Category` (`Mem_Id`, `Cat_Id`) VALUES
(25, 6),
(25, 7),
(25, 11);

-- --------------------------------------------------------

--
-- Table structure for table `Major`
--

CREATE TABLE `Major` (
  `Major_Id` int NOT NULL,
  `Major_Level` int NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `Major`
--

INSERT INTO `Major` (`Major_Id`, `Major_Level`) VALUES
(1, 0),
(2, 1);

-- --------------------------------------------------------

--
-- Table structure for table `Member`
--

CREATE TABLE `Member` (
  `Mem_Id` int NOT NULL,
  `Mem_Fname` varchar(50) NOT NULL,
  `Mem_Lname` varchar(50) NOT NULL,
  `Mem_Username` varchar(20) NOT NULL,
  `Mem_Password` varchar(20) NOT NULL,
  `Mem_Email` varchar(50) NOT NULL,
  `Mem_Phone` char(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `Member`
--

INSERT INTO `Member` (`Mem_Id`, `Mem_Fname`, `Mem_Lname`, `Mem_Username`, `Mem_Password`, `Mem_Email`, `Mem_Phone`) VALUES
(5, 'memFTest', 'memLTest', 'memUserTest', 'memPassTest', 'memTest@gmail.com', '0980000000'),
(7, 'TestFmem2', 'TestLmem2', 'TestUmem23', 'TestPmem2', 'Testmem2@gmail.com', '0987654321'),
(25, 'Anonnn', 'Chaiyasong', 'abcd', '123456', 'abcd@gmail.com', '0980960857'),
(26, 'testapp', 'testLapp', 'abbb', 'abbb', 'asdasdsad@gmail.com', '0945518201'),
(29, 'testapp', 'testLapp', 'gun', 'gungungun', 'gun@gmail.com', '0642623451'),
(30, 'dddghhggffff', 'agafgagagag', 'qwer', 'qwert', 'uyttree@hotmail.com', '0980880777'),
(31, 'history', 'test', 'history', '123456', 'historyTest@gmail.com', '0981234567');

-- --------------------------------------------------------

--
-- Table structure for table `News`
--

CREATE TABLE `News` (
  `News_Id` int NOT NULL,
  `News_Name` varchar(255) NOT NULL,
  `News_Details` text NOT NULL,
  `Date_Added` timestamp NOT NULL,
  `Cat_Id` int NOT NULL,
  `Major_Id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `News`
--

INSERT INTO `News` (`News_Id`, `News_Name`, `News_Details`, `Date_Added`, `Cat_Id`, `Major_Id`) VALUES
(42, 'ชุดพิธีการทีมชาติไทยติดไหม? “โอลิมปิก 2024” เผยยูนิฟอร์มนักกีฬา 5 ชาติ ดีไซน์สวยสุด', 'เว็บไซต์อย่างเป็นทางการโอลิมปิก เผยท็อป 10 ชุดชาติที่เข้าร่วมแข่งขันโอลิมปิก 2024\n\nวันที่ 25 กรกฎาคม 2567 ฝ่ายจัดแข่งโอลิมปิก 2024 ณ กรุงปารีส ประเทศฝรั่งเศส เขียนบทความจัด 5 อันดับแรก ยูนิฟอร์มนักกีฬาประจำชาติที่เข้าร่วมโอลิมปิกครั้งนี้\n\nโดยที่ยกมามีหลากหลายประเทศทั้ง มองโกเลีย ที่ก่อนหน้านี้ ศาสตราจารย์พิเศษ เจริญ วรรธนะสิน รองประธานกรรมการคณะกรรมการโอลิมปิคแห่งประเทศไทยฯ เคยบอกว่าไว้เหมือนงิ้ว รวมไปถึง เกาหลีใต้ และ เฮติ ที่เคยถูกพาดพิงก็ต่างติดท็อป 5 เข้ามาทั้งหมด', '2024-10-01 19:25:00', 6, 1),
(43, '“ทีมชาติไทย U20” โดน “มาเลเซีย” ไล่เจ๊า 1-1 ลิ่วรอบรองฯ U19 ชิงแชมป์อาเซียน ปะทะ “ออสเตรเลีย”', 'วันที่ 25 กรกฎาคม 2567 เวลา 15.00 น. ณ จีบีที สเตเดียม การแข่งขันฟุตบอลชิงแชมป์อาเซียนรุ่นอายุไม่เกิน 19 ปี รอบแบ่งกลุ่ม กลุ่มซี นัดที่สาม ทีมชาติไทย พบกับ ทีมชาติมาเลเซีย\n\nสถานการณ์ของทั้งสองทีม มีหกคะแนนเต็มจากสองเกมแรกทั้งคู่และผ่านเข้ารอบรองชนะเลิศได้แน่นอนแล้ว โดยเกมนี้ เอเมอร์สัน เปไรร่า หัวหน้าผู้ฝึกสอน ส่ง ธนกฤต โชติเมืองปัก ลงเล่นเป็นตัวจริงโดยจะทำเกมหลัง สองกองหน้าอย่าง ธนาวุฒิ โพธิ์ชัย และ เคแลน ไรอัน\n\nเริ่มเกมมาแค่ 5 นาที จากความผิดพลาดของ มาเลเซีย และเป็น เคแลน ไรอัน ที่ยิงเข้าไปให้ ทีมชาติไทย U20 นำก่อน 1-0\n\nหลังจากนั้น ทั้งสองทีมก็เล่นได้อย่างสูสี แต่ก็เจาะกันไม่เข้าจบครึ่งแรก ทีมชาติไทย ยังนำอยู่ 1-0 \n\nครึ่งหลังไทย เปลี่ยน ณัฐปคัลภ์ พรมทองมี และ จิระพงศ์ พึ่งวีระวงศ์ ลงมาเล่นแทน ธนกฤต โชติเมืองปัก และ พงศกร สังขโสภา\nเริ่มครึ่งหลัง มาสามนาที มาเลเซียมาได้จุดโทษ และเป็น ปาวิธราน กูนาลาน ที่รับหน้าที่สังหารเข้าไปให้สกอร์กลับมาเท่ากันที่ 1-1\n\nนาที 74 ทีมชาติไทย U20 เกือบได้ประตูออกนำอีกครั้งจากจังหวะที่มาเลเซีย พลาด และเป็น จิระพงศ์ พึ่งวีระวงศ์ ได้หลุดไปกระดกติดเซฟแล้วชนคานออกหลังไป\n\nช่วงเวลาที่เหลือไม่มีประตูเพิ่มเติมจบเกม ทีมชาติไทย U20 เสมอกับ มาเลเซีย ไป 1-1 ทำให้ทั้งสองทีมมีเจ็ดคะแนนเท่ากัน แต่ประตูได้เสียมาเลเซียดีกว่าเลยเป็นแชมป์กลุ่ม ส่วนไทยจบด้วยการเป็นรองแชมป์กลุ่มที่ดีที่สุด จากสามกลุ่ม และผ่านเข้ารอบรองชนะเลิศทั้งคู่\n\n', '2024-07-26 00:52:49', 6, 1),
(44, 'เตรียมจัด ครม.สัญจรฯ จ.อยุธยา 19-20 ส.ค.นี้ เน้นแก้ปัญหา 6 กลุ่มจังหวัด', 'ทำเนียบรัฐบาล เคาะ ครม.สัญจรฯ ครั้งต่อไป 19-20 ส.ค. ที่ จ.อยุธยา เน้นวาระแก้ปัญหาน้ำ-พัฒนาท่องเที่ยว-ภาคอุตสาหกรรม กลุ่ม 6 จังหวัดภาคกลาง\n\nวันที่ 30 กรกฎาคม 2567 ผู้สื่อข่าวรายงานจากทำเนียบรัฐบาล ว่า การประชุมคณะรัฐมนตรีอย่างเป็นทางการนอกสถานที่ (ครม.สัญจรฯ) ครั้งต่อไปได้มีการกำหนดแล้วคือ วันที่ 19-20 สิงหาคม 2567 ที่จังหวัดพระนครศรีอยุธยา โดยมีวาระสำคัญเพื่อแก้ปัญหาและพัฒนา 6 กลุ่มจังหวัดภาคกลาง ประกอบด้วย พระนครศรีอยุธยา อ่างทอง ชัยนาท สิงห์บุรี สระบุรี ลพบุรี \n\nสำหรับการประชุม ครม.สัญจร ที่จังหวัดพระนครศรีอยุธยาจะมีขึ้นในวันที่ 20 ส.ค. ที่มหาวิทยาลัยเทคโนโลยีราชมงคลสุวรรณภูมิ ศูนย์พระนครศรีอยุธยา วาสุกรี \n\nอย่างไรก็ตามการประชุมกลุ่มจังหวัดดังกล่าวเน้นในเรื่องการแก้ปัญหาน้ำท่วม น้ำแล้ง การพัฒนาการท่องเที่ยว และสนับสนุนภาคอุตสาหกรรม เนื่องจากในพื้นนี้มีโรงงานจำนวนมาก', '2024-07-26 01:02:23', 7, 1),
(45, 'ต่างชาติแอบเก็บหุ้นไทย 1.2 หมื่นล้าน ช่วงตลาดผันผวน ซื้อหุ้น CPALL เยอะสุด ทะลุ 2 พันล้าน', 'ท่ามกลางตลาดหุ้นไทยที่ผันผวนในเดือนกรกฎาคมนี้ หลังปัจจัยภายในประเทศยังมีความเสี่ยง ทั้งจากความไม่แน่นอนการเมือง และความล่าช้าของกองทุน Thai ESG ใหม่ ขณะที่ตลาดหุ้นโลกยังคงผันผวนอย่างหนัก โดยเฉพาะหุ้นกลุ่มเทคโนโลยี\n\n\nอย่างไรก็ดี นักวิเคราะห์หลักทรัพย์ เห็นสัญญาณที่นักลงทุนต่างชาติยังเข้ามาลงทุนในหุ้นไทยตั้งแต่ต้นเดือน สะท้อนจากเม็ดเงินที่มีการไหลเข้าผ่าน NVDR กว่า 1.2 หมื่นล้านบาท โดยหุ้นที่ถูกซื้อผ่าน NVDR ในเดือนนี้เยอะสุด คือ CPALL \n\n\nบทวิเคราะห์ บริษัทหลักทรัพย์ เอเซีย พลัส จํากัด ระบุว่า ตลาดหุ้นโลกผันผวนโดยเฉพาะหุ้นกลุ่มเทคโนโลยีที่ปรับตัวลดลงหนัก จากดัชนี NASDAQ วานนี้ -3.64% ลงภายในวันเดียวแรงสุดในปีนี้ แต่ต่างชาติแอบสะสมหุ้นไทยผ่าน NVDR ช่วงนี้ \n\n\nเม็ดเงินที่ไหลออกจากตลาดหุ้นเทคโนโลยีขนาดใหญ่ มีการกระเซ็นเข้ามาในตลาดหุ้นประเทศกำลังพัฒนาแถบเอเชียตะวันออกเฉียงใต้มากขึ้น รวมถึงตลาดหุ้นไทยที่ทรงๆตัว -0.2% จากต้นเดือน\nแม้ในประเทศมีประเด็นกดดันหลากหลาย ทั้งความไม่แน่นอนการเมือง การดำเนินนโยบายต่างๆ ของรัฐบาลที่เลื่อนออกไป โดยเฉพาะกองทุน Thai ESG ใหม่ รวมถึงความกังวลการ Rollover หุ้นกู้ในช่วงนี้กดดันดัชนีตลาดหุ้นไทยขยับตัวขึ้นได้ยาก\n\n\nแต่เชื่อว่าการปรับตัวลงของดัชนีหุ้นไทยก็จำกัดเช่นกัน เพราะเห็นการทำงานของมาตรการ Uptick Rule จากปริมาณการ Short Sell เดือนนี้เหลือเพียง 4.35% ของมูลค่าซื้อขาย (ค่าเฉลี่ยปีนี้ 11%) และต่างชาติเริ่มกลับมาซื้อทางตรงบ้าง โดยซื้อสุทธิหุ้นไทยติดต่อกัน 5 วัน\nโดย 10 รายชื่อหุ้นที่ถูกซื้อผ่าน NVDR ในเดือนนี้เยอะสุด คือ\n\nหุ้น CPALL รวมมูลค่าซื้อสุทธิ 2,045 ล้านบาท\nหุ้น BBL มูลค่าซื้อสุทธิ 1,759 ล้านบาท\nหุ้น DELTA มูลค่าซื้อสุทธิ 1,758 ล้านบาท\nหุ้น TRUE มูลค่าซื้อสุทธิ 1,602 ล้านบาท\nหุ้น CPF มูลค่าซื้อสุทธิ 1,209 ล้านบาท\nหุ้น ADVANC มูลค่าซื้อสุทธิ 1,196 ล้านบาท\nหุ้น KBANK มูลค่าซื้อสุทธิ 1,181 ล้านบาท\nหุ้น IVL มูลค่าซื้อสุทธิ 910 ล้านบาท\nหุ้น PTTGC มูลค่าซื้อสุทธิ 627 ล้านบาท\nหุ้น COM7 มูลค่าซื้อสุทธิ 598 ล้านบาท', '2024-07-18 01:19:00', 8, 1),
(46, '“ดิจิทัลวอลเล็ต” ชัดเจน ช่วยหุ้นค้าปลีกคึกคัก จับตา 3 ยักษ์ได้ประโยชน์', 'จับตาแถลงโครงการ “ดิจิทัลวอลเล็ต” โดยวันนี้ (24 ก.ค. 67) มีการแถลงข่าวรายละเอียดเงื่อนไขของผู้ที่สามารถเข้าโครงการ วันลงทะเบียนว่า สามารถลงทะเบียนผ่านแอปพลิเคชัน \"ทางรัฐ\" ในวันที่ 1 สิงหาคม ถึง 15 กันยายนนี้ เคาะอายุ 16 ปี รายได้ไม่เกินปีละ 8.4 แสนบาท และใช้งบทั้งหมด 4.5 แสนล้านบาท\n\nด้านนักวิเคราะห์หลักทรัพย์ ต่างมีมุมมองเชิงบวกต่อโครงการดังกล่าว โดยคาดหวังว่าโครงการดิจิทัลวอลเล็ต จะช่วยเข้ามากระตุ้นกำลังซื้อ หนุนตลาดหุ้นไทย โดยเฉพาะหุ้นค้าปลีกได้ พร้อมคาดโครงการดังกล่าวมีโอกาสออกมาในช่วงไตรมาส 4/67 ถึงไตรมาส 1/68\n\nบทวิเคราะห์ บริษัทหลักทรัพย์ เอเซีย พลัส จำกัด ระบุว่า มาตรการกระตุ้นเศรษฐกิจไทยผ่านโครงการดิจิทัลวอลเล็ต แม้จะยังเห็นสัญญาณของความไม่พร้อมให้หลายๆ ส่วน อาทิ งบประมาณโครงการรอรัฐสภาพิจารณา รวมถึงระบบชำระเงิน ที่ยังไม่เปิดประมูล เป็นต้น แต่อย่างไรก็ตามยังคงเห็นความตั้งใจของรัฐบาลในการเดินหน้าโครงการต่อเนื่อง\n\nโดย ภูมิธรรม เวชยชัย รองนายกรัฐมนตรีและรัฐมนตรีว่าการกระทรวงพาณิชย์ เปิดเผยว่าจะเริ่มแจกเงินดิจิทัลในเดือน ต.ค.นี้ ขณะที่กำหนดการนัดหมายแถลงความชัดเจนรายละเอียดโครงการ เศรษฐา ทวีสิน นายกรัฐมนตรี จะเป็นผู้ชี้แจงรายละเอียดทั้งหมดวันนี้\n\nอย่างไรก็ตาม การชี้แจงรายละเอียดโครงการดิจิทัลวอลเล็ต สะท้อนการเดินหน้านโยบายต่อเนื่อง มองเป็น Sentiment เชิงบวกต่อกลุ่มค้าปลีก เช่น CPALL, CPAXT และ BJC', '2024-07-26 01:24:07', 8, 1),
(47, 'เครื่องดื่มสำหรับเด็ก ยี่ห้อไหนดี เติมพลังให้สดชื่น พร้อมลุยทุกกิจกรรม', 'วัยเด็กเป็นช่วงวัยแห่งการเรียนรู้ โดยเฉพาะอย่างยิ่งเด็กชั้นอนุบาลและชั้นประถมที่ใช้พลังงานไปกับการทำกิจกรรมต่างๆ นอกจากคุณพ่อคุณแม่จะใส่ใจเรื่องอาหารที่มีประโยชน์แล้ว เครื่องดื่มสำหรับเด็ก ก็เป็นอีกหนึ่งตัวช่วยที่จะมาเติมพลังและความสดชื่นระหว่างวันให้กับเด็กๆ ให้พร้อมลุยกับทุกกิจกรรมได้\n\nบทความนี้ทางเราได้คัดเลือกเครื่องดื่มต่างๆ ทั้งซุปไก่สกัด น้ำผักและน้ำผลไม้ที่เหมาะสำหรับเด็กๆ มาให้แล้ว\n\n1. Scotch Kitz ซุปไก่สกัดผสมนม\nScotch Kitz ซุปไก่สกัดผสมนม มีส่วนผสมของน้ำมันปลาและวิตามินบีคอมเพล็กซ์ ที่มีประโยชน์ต่อร่างกาย รสชาติดี ดื่มง่าย เหมาะกับเด็กๆ ดื่มได้ทุกวัน มีให้เลือก 2 รสชาติคือ รสช็อกโกแลตและรสสตรอว์เบอร์รี่\n\n2. Brand\'s Junior ซุปไก่สกัดผสมนม\nเครื่องดื่มซุปไก่สกัดผสมนมจาก Brand\'s Junior มีซุปไก่สกัดเข้มข้นถึง 82% และยังมีส่วนผสมของแคลเซียม วิตามินดี DHA ซึ่งเป็นสารอาหารที่มีประโยชน์ต่อร่างกาย มาในรูปแบบนมรสช็อกโกแลต รสชาติอร่อย มีกลิ่นหอม ทำให้ดื่มง่าย เหมาะสำหรับเด็กอายุ 3-12 ปี\n\n3. The Eden Mix Multi-Vitamin น้ำผักผลไม้แบบผงสำหรับเด็ก \nน้ำผักและผลไม้ชนิดผงจาก The Eden Mix Multi-Vitamin อุดมไปด้วยส่วนผสมจากธรรมชาติ ทั้งผักใบเขียวและผลไม้นานาชนิด สกัดด้วยเทคโนโลยี Bioactive Dehydration ซึ่งช่วยคงคุณค่าทางสารอาหารไว้ได้ และมีส่วนผสมของวิตามินรวมที่มีประโยชน์กับร่างกาย รสชาติเปรี้ยวอมหวานด้วยสารสกัดจากหญ้าหวาน ช่วยให้เด็กๆ ดื่มได้ง่ายขึ้น มีให้เลือก 2 สูตร คือ\n- Green Mix ผงผักและวิตามินรวม 27 ชนิด\n- Red Mix ผงผลไม้และวิตามินรวม 30 ชนิด\n\n4. Narah GT-One Green Juice \nเครื่องดื่มกรีนจูซ น้ำผักผลไม้ชนิดผงที่อุดมไปด้วยวิตามินบี วิตามินซี วิตามินอี และวิตามินเอ จากผงใบอ่อนข้าวบาร์เลย์และผงแอปเปิลเขียวนำเข้าจากประเทศสหรัฐอเมริกา รสชาติอร่อยและดื่มง่าย สามารถชงดื่มได้ทุกวัน\n\n5. Sweet Pea น้ำแอปเปิลผสมน้ำลูกพรุน\nSweet Pea น้ำแอปเปิลผสมน้ำลูกพรุนอุดมไปด้วยใยอาหาร, โพแทสเซียม, แคลเซียม, เหล็กและวิตามินซี ซึ่งมีส่วนช่วยเรื่องการขับถ่าย รสชาติอร่อย ดื่มง่าย ไม่มีส่วนผสมของน้ำตาล สารกันเสียและสารปรุงแต่ง เป็นเครื่องดื่มที่สามารถดื่มได้ทั้งครอบครัว', '2024-10-01 19:21:00', 9, 1),
(48, 'จับมือวางเพลิงเผาโรงพักปากเกร็ด ที่แท้เป็นหนุ่มวัย 28 อ้างเครียดปัญหาส่วนตัว', 'จับได้แล้วมือวางเพลิงเผาห้องเก็บเอกสารสำนวนการสอบสวนอาคารที่ทำการธุรการของ สภ.ปากเกร็ด ที่แท้เป็นหนุ่มวัย 28 ปี อ้างเครียดปัญหาส่วนตัว ไม่มีบุคคลใดจ้างวานให้ลงมือก่อเหตุ\n\nเมื่อวันที่ 25 กรกฎาคม 2567 พ.ต.อ.อภิศักดิ์ โชติกเสถียร ผกก.สภ.ปากเกร็ด พ.ต.ท.ติรัส ตฤณเตชะ รอง ผกก.สส.สภ.ปากเกร็ด พ.ต.ท.แสงระวี ภูสอาด สว.สส.สภ.ปากเกร็ด นำกำลังพร้อมหมายจับศาลจังหวัดนนทบุรีที่ จ.661/2567 ลงวันที่ 24 กรกฎาคม 2567 เข้าจับกุม นายปฏิวัติ จูบ้วนกิม อายุ 28 ปี ที่อยู่บ้านเลขที่ 150/32 ม.3 ต.บางพูด อ.ปากเกร็ด จ.นนทบุรี ในความผิดฐาน วางเพลิงเผาทรัพย์โรงเรือนอันเป็นสาธารณสมบัติของแผ่นดิน\n\nสืบเนื่องจากกรณีเกิดเหตุเพลิงไหม้ บริเวณทางเดินชั้นสองหน้าห้องอำนวยการและห้องเก็บเอกสารสำนวนการสอบสวนอาคารที่ทำการธุรการของ สภ.ปากเกร็ด เมื่อช่วงค่ำของวันที่ 16 ก.ค. ที่ผ่านมา ซึ่งเบื้องต้นทางเจ้าหน้าที่คาดว่าสาเหตุเกิดจากไฟฟ้าลัดวงจร ตามที่เสนอข่าวไปแล้วนั้น\nต่อมาทางชุดสืบสวนของ สภ.ปากเกร็ด ทำการสืบสวนมูลเหตุที่แท้จริง จนทราบว่านายปฏิวัติ เป็นผู้ก่อเหตุวางเพลิงเผาโรงพัก จึงรวบรวมพยานหลักฐานขออนุมัติศาลออกหมายจับ โดยติดตามจับกุมตัวได้บริเวณหน้าร้านเสื้อนครบาลวินเทจ เลขที่ 202 ซอยนวมินทร์ 70 แยก 1 แขวงคลองกุ่ม เขตบึงกุ่ม กรุงเทพฯ ก่อนนำตัวไปตรวจค้นบ้านพัก พร้อมตรวจยึดของกลางในการก่อเหตุ ประกอบด้วย จยย.ยี่ห้อฮอนด้า รุ่นซูเมอร์เอ็กซ์ สีน้ำเงิน-ดำ หมายเลขทะเบียน 5กฬ 9844 กรุงเทพฯ และอุปกรณ์ที่ใช้ในการก่อเหตุ รวม 9 รายการ\n\nจากการสอบปากคำนายปฏิวัติ ให้การรับสารภาพว่า สาเหตุที่มาก่อเหตุนั้น เนื่องจากมีอาการเครียดปัญหาส่วนตัวมาก กรณีที่ทราบข่าวว่ามีเจ้าหน้าที่ตำรวจหน่วยอื่นส่งเอกสารทางราชการไปส่งให้แม่ของตน โดยแม่เข้าใจคลาดเคลื่อนว่าเป็นหมายจับและตนเองมีความผิด ทำให้แม่ต่อว่าตนอย่างรุนแรง ตนจึงเกิดความโกรธเคือง ก่อนไปซื้อน้ำมันเบนซินมาราดจุดไฟเผาโรงพัก อีกทั้งยืนยันว่าไม่มีบุคคลใดมาว่าจ้าง หรือจ้างวาน หรือให้ทรัพย์สินประโยชน์อื่นใดให้มาลงมือก่อเหตุ หรือบังคับขู่เข็ญให้ตนมาลงมือก่อเหตุวางเพลิงในครั้งนี้', '2024-10-02 19:20:00', 22, 1);

-- --------------------------------------------------------

--
-- Table structure for table `News_Rating`
--

CREATE TABLE `News_Rating` (
  `Mem_Id` int NOT NULL,
  `News_Id` int NOT NULL,
  `Rating_Score` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `News_Rating`
--

INSERT INTO `News_Rating` (`Mem_Id`, `News_Id`, `Rating_Score`) VALUES
(25, 42, 4.5),
(25, 43, 3),
(25, 44, 4),
(25, 46, 4.5),
(25, 47, 5),
(25, 48, 4.5),
(31, 42, 3),
(31, 48, 5);

-- --------------------------------------------------------

--
-- Table structure for table `News_Sub_Cate`
--

CREATE TABLE `News_Sub_Cate` (
  `News_Id` int NOT NULL,
  `Sub_Cat_Id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `News_Sub_Cate`
--

INSERT INTO `News_Sub_Cate` (`News_Id`, `Sub_Cat_Id`) VALUES
(43, 6),
(47, 9),
(42, 23),
(45, 24);

-- --------------------------------------------------------

--
-- Table structure for table `Picture`
--

CREATE TABLE `Picture` (
  `News_Id` int NOT NULL,
  `News_Pic` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `Picture`
--

INSERT INTO `Picture` (`News_Id`, `News_Pic`) VALUES
(42, '11s5hs9a.png'),
(42, '1hirbrlv.png'),
(42, '57hzry5f.png'),
(42, 'cfdp9ogv.png'),
(42, 'cover_9eo309vs.png'),
(42, 'w6d9ayt3.png'),
(43, 'cover_fbvbcy04.png'),
(43, 'x4cv7cnj.png'),
(44, 'cover_puypusy3.png'),
(44, 'o3wq8nmr.png'),
(45, '6dr26ivl.png'),
(45, 'cover_8o7s78tb.png'),
(46, 'cover_ewy0rhvj.png'),
(46, 'gqgc4myh.jpg'),
(47, 'cover_cs10kuf0.png'),
(47, 'dowvkcbm.png'),
(48, '8ep2u7h0.png'),
(48, 'cover_1e4239db.png'),
(48, 'u7e2f2o0.png');

-- --------------------------------------------------------

--
-- Table structure for table `Read_History`
--

CREATE TABLE `Read_History` (
  `Mem_Id` int NOT NULL,
  `News_Id` int NOT NULL,
  `Read_Date` timestamp NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `Read_History`
--

INSERT INTO `Read_History` (`Mem_Id`, `News_Id`, `Read_Date`) VALUES
(25, 46, '2024-10-07 18:52:52'),
(25, 48, '2024-10-07 17:12:01'),
(26, 43, '2024-08-05 04:11:04'),
(31, 42, '2024-10-07 17:09:45'),
(31, 48, '2024-10-07 17:10:02');

-- --------------------------------------------------------

--
-- Table structure for table `Read_Later`
--

CREATE TABLE `Read_Later` (
  `Mem_Id` int NOT NULL,
  `News_Id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `Read_Later`
--

INSERT INTO `Read_Later` (`Mem_Id`, `News_Id`) VALUES
(25, 44),
(25, 48);

-- --------------------------------------------------------

--
-- Table structure for table `Sub_Category`
--

CREATE TABLE `Sub_Category` (
  `Sub_Cat_Id` int NOT NULL,
  `Sub_Cat_Name` varchar(50) NOT NULL,
  `Cat_Id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `Sub_Category`
--

INSERT INTO `Sub_Category` (`Sub_Cat_Id`, `Sub_Cat_Name`, `Cat_Id`) VALUES
(6, 'ฟุตบอล', 6),
(7, 'วอเลย์บอล', 6),
(8, 'วัยรุ่น', 9),
(9, 'เด็ก', 9),
(10, 'ผู้สูงอายุ', 9),
(11, 'TFT', 10),
(12, 'LOL', 10),
(13, 'DOTA2', 10),
(14, 'ตุรกี', 11),
(19, 'ท้องถนน', 19),
(21, 'ทางอากาศ', 19),
(23, 'โอลิมปิก 2024', 6),
(24, 'หุ้นไทย', 8),
(25, 'หุ้นต่างประเทศ', 8);

-- --------------------------------------------------------

--
-- Table structure for table `Total_Read`
--

CREATE TABLE `Total_Read` (
  `Count_Id` int NOT NULL,
  `News_Id` int DEFAULT NULL,
  `Mem_Id` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `Total_Read`
--

INSERT INTO `Total_Read` (`Count_Id`, `News_Id`, `Mem_Id`) VALUES
(239, 48, 31),
(240, 48, 31),
(241, 42, 31),
(242, 42, 31),
(243, 48, 31),
(244, 48, 25),
(245, 48, 25),
(246, 48, 25),
(247, 46, 25);

-- --------------------------------------------------------

--
-- Table structure for table `Work_Status`
--

CREATE TABLE `Work_Status` (
  `Adm_Id` int NOT NULL,
  `Adm_Status` int NOT NULL DEFAULT '1',
  `Start_Date` date NOT NULL,
  `End_Date` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `Work_Status`
--

INSERT INTO `Work_Status` (`Adm_Id`, `Adm_Status`, `Start_Date`, `End_Date`) VALUES
(16, 1, '2024-05-18', NULL),
(27, 0, '2024-05-19', '2024-05-31');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Admin`
--
ALTER TABLE `Admin`
  ADD PRIMARY KEY (`Adm_Id`),
  ADD UNIQUE KEY `Adm_Username` (`Adm_Username`),
  ADD UNIQUE KEY `Adm_Email` (`Adm_Email`),
  ADD UNIQUE KEY `Adm_Phone` (`Adm_Phone`);

--
-- Indexes for table `Category`
--
ALTER TABLE `Category`
  ADD PRIMARY KEY (`Cat_Id`);

--
-- Indexes for table `Favorite_Category`
--
ALTER TABLE `Favorite_Category`
  ADD PRIMARY KEY (`Mem_Id`,`Cat_Id`),
  ADD KEY `Favorite_Category_ibfk_2` (`Cat_Id`);

--
-- Indexes for table `Major`
--
ALTER TABLE `Major`
  ADD PRIMARY KEY (`Major_Id`);

--
-- Indexes for table `Member`
--
ALTER TABLE `Member`
  ADD PRIMARY KEY (`Mem_Id`),
  ADD UNIQUE KEY `Mem_Username` (`Mem_Username`),
  ADD UNIQUE KEY `Mem_Email` (`Mem_Email`),
  ADD UNIQUE KEY `Mem_Phone` (`Mem_Phone`);

--
-- Indexes for table `News`
--
ALTER TABLE `News`
  ADD PRIMARY KEY (`News_Id`),
  ADD KEY `Cat_Id` (`Cat_Id`),
  ADD KEY `Major_Id` (`Major_Id`);

--
-- Indexes for table `News_Rating`
--
ALTER TABLE `News_Rating`
  ADD PRIMARY KEY (`Mem_Id`,`News_Id`),
  ADD KEY `News_Rating_ibfk_2` (`News_Id`);

--
-- Indexes for table `News_Sub_Cate`
--
ALTER TABLE `News_Sub_Cate`
  ADD PRIMARY KEY (`News_Id`,`Sub_Cat_Id`),
  ADD KEY `News_Sub_Cate_ibfk_2` (`Sub_Cat_Id`);

--
-- Indexes for table `Picture`
--
ALTER TABLE `Picture`
  ADD PRIMARY KEY (`News_Id`,`News_Pic`);

--
-- Indexes for table `Read_History`
--
ALTER TABLE `Read_History`
  ADD PRIMARY KEY (`Mem_Id`,`News_Id`),
  ADD KEY `Read_History_ibfk_2` (`News_Id`);

--
-- Indexes for table `Read_Later`
--
ALTER TABLE `Read_Later`
  ADD PRIMARY KEY (`Mem_Id`,`News_Id`),
  ADD KEY `Read_Later_ibfk_2` (`News_Id`);

--
-- Indexes for table `Sub_Category`
--
ALTER TABLE `Sub_Category`
  ADD PRIMARY KEY (`Sub_Cat_Id`),
  ADD KEY `Sub_Category_ibfk_1` (`Cat_Id`);

--
-- Indexes for table `Total_Read`
--
ALTER TABLE `Total_Read`
  ADD PRIMARY KEY (`Count_Id`),
  ADD KEY `Total_Read_ibfk_1` (`News_Id`),
  ADD KEY `Total_Read_ibfk_2` (`Mem_Id`);

--
-- Indexes for table `Work_Status`
--
ALTER TABLE `Work_Status`
  ADD PRIMARY KEY (`Adm_Id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Admin`
--
ALTER TABLE `Admin`
  MODIFY `Adm_Id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT for table `Category`
--
ALTER TABLE `Category`
  MODIFY `Cat_Id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `Major`
--
ALTER TABLE `Major`
  MODIFY `Major_Id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `Member`
--
ALTER TABLE `Member`
  MODIFY `Mem_Id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT for table `News`
--
ALTER TABLE `News`
  MODIFY `News_Id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=154;

--
-- AUTO_INCREMENT for table `Sub_Category`
--
ALTER TABLE `Sub_Category`
  MODIFY `Sub_Cat_Id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `Total_Read`
--
ALTER TABLE `Total_Read`
  MODIFY `Count_Id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=248;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `Favorite_Category`
--
ALTER TABLE `Favorite_Category`
  ADD CONSTRAINT `Favorite_Category_ibfk_1` FOREIGN KEY (`Mem_Id`) REFERENCES `Member` (`Mem_Id`) ON DELETE CASCADE ON UPDATE RESTRICT,
  ADD CONSTRAINT `Favorite_Category_ibfk_2` FOREIGN KEY (`Cat_Id`) REFERENCES `Category` (`Cat_Id`) ON DELETE CASCADE ON UPDATE RESTRICT;

--
-- Constraints for table `News`
--
ALTER TABLE `News`
  ADD CONSTRAINT `News_ibfk_1` FOREIGN KEY (`Cat_Id`) REFERENCES `Category` (`Cat_Id`),
  ADD CONSTRAINT `News_ibfk_2` FOREIGN KEY (`Major_Id`) REFERENCES `Major` (`Major_Id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Constraints for table `News_Rating`
--
ALTER TABLE `News_Rating`
  ADD CONSTRAINT `News_Rating_ibfk_1` FOREIGN KEY (`Mem_Id`) REFERENCES `Member` (`Mem_Id`) ON DELETE CASCADE ON UPDATE RESTRICT,
  ADD CONSTRAINT `News_Rating_ibfk_2` FOREIGN KEY (`News_Id`) REFERENCES `News` (`News_Id`) ON DELETE CASCADE ON UPDATE RESTRICT;

--
-- Constraints for table `News_Sub_Cate`
--
ALTER TABLE `News_Sub_Cate`
  ADD CONSTRAINT `News_Sub_Cate_ibfk_1` FOREIGN KEY (`News_Id`) REFERENCES `News` (`News_Id`) ON DELETE CASCADE ON UPDATE RESTRICT,
  ADD CONSTRAINT `News_Sub_Cate_ibfk_2` FOREIGN KEY (`Sub_Cat_Id`) REFERENCES `Sub_Category` (`Sub_Cat_Id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `Picture`
--
ALTER TABLE `Picture`
  ADD CONSTRAINT `Picture_ibfk_1` FOREIGN KEY (`News_Id`) REFERENCES `News` (`News_Id`) ON DELETE CASCADE ON UPDATE RESTRICT;

--
-- Constraints for table `Read_History`
--
ALTER TABLE `Read_History`
  ADD CONSTRAINT `Read_History_ibfk_1` FOREIGN KEY (`Mem_Id`) REFERENCES `Member` (`Mem_Id`) ON DELETE CASCADE ON UPDATE RESTRICT,
  ADD CONSTRAINT `Read_History_ibfk_2` FOREIGN KEY (`News_Id`) REFERENCES `News` (`News_Id`) ON DELETE CASCADE ON UPDATE RESTRICT;

--
-- Constraints for table `Read_Later`
--
ALTER TABLE `Read_Later`
  ADD CONSTRAINT `Read_Later_ibfk_1` FOREIGN KEY (`Mem_Id`) REFERENCES `Member` (`Mem_Id`) ON DELETE CASCADE ON UPDATE RESTRICT,
  ADD CONSTRAINT `Read_Later_ibfk_2` FOREIGN KEY (`News_Id`) REFERENCES `News` (`News_Id`) ON DELETE CASCADE ON UPDATE RESTRICT;

--
-- Constraints for table `Sub_Category`
--
ALTER TABLE `Sub_Category`
  ADD CONSTRAINT `Sub_Category_ibfk_1` FOREIGN KEY (`Cat_Id`) REFERENCES `Category` (`Cat_Id`) ON DELETE CASCADE ON UPDATE RESTRICT;

--
-- Constraints for table `Total_Read`
--
ALTER TABLE `Total_Read`
  ADD CONSTRAINT `Total_Read_ibfk_1` FOREIGN KEY (`News_Id`) REFERENCES `News` (`News_Id`) ON DELETE SET NULL ON UPDATE RESTRICT,
  ADD CONSTRAINT `Total_Read_ibfk_2` FOREIGN KEY (`Mem_Id`) REFERENCES `Member` (`Mem_Id`) ON DELETE SET NULL ON UPDATE RESTRICT;

--
-- Constraints for table `Work_Status`
--
ALTER TABLE `Work_Status`
  ADD CONSTRAINT `Work_Status_ibfk_1` FOREIGN KEY (`Adm_Id`) REFERENCES `Admin` (`Adm_Id`) ON DELETE CASCADE ON UPDATE RESTRICT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
