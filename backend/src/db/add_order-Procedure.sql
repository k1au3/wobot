CREATE PROCEDURE 
    add_order( IN orderName VARCHAR(50), IN category VARCHAR(50), IN orderRating INT(11), IN orderImg VARCHAR(225), IN price INT(11), IN discountRate INT(11), IN discountPrice INT(11) )
    BEGIN 
        INSERT INTO orders ( order_name, order_category, order_rating, order_img, order_price, discount_rate, discount_price ) 
        VALUES ( orderName, category, orderRating, orderImg, price, discountRate, discountPrice ); 
    END;