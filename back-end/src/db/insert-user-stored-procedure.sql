CREATE PROCEDURE 
    insert_data( IN usrname VARCHAR(25), IN pass CHAR(60), IN firstname VARCHAR(50), IN lastname VARCHAR(50), IN useremail VARCHAR(100), IN userage INT(11) )
    BEGIN 
        INSERT INTO user ( username, password, first_name, last_name, email, age ) 
        VALUES ( usrname, pass, firstname, lastname, useremail, userage ); 
    END;