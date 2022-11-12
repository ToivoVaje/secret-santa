# secret-santa

Secret Santa with Google Sheet and Google script.
You can use this piece of code to do secret santa lottery. It will shuffle the names and make sure no-one gets themselves. It will also make sure that people are not buying presents to their own family members.
You can customize the message that will be sent to receivers by editing line 16.

# Google Sheet

Google Sheet should contain the following colums:
1. Giver, the name of the peron giving the present
2. Email, email address of this person
3. Family, this column is used to make sure people are not buying present to their own family members
4. Receiver, after running the script, the lottery will put the name of the receiver into this column
5. Mail sent, this column will be populated once the email has been sent to receiver

# Google Script

The main function is called `Sendmail`. To enable mail sending, uncomment line 16.

Lottery functionality is in function `shuffle`.

# Assumptions

- It is assumed that you have a Gmail account.
