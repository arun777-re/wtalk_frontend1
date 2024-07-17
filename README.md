<!-- while working on ids must console.log ids and check whether id name explained in route and controller and route nmust be same -->

<!-- $addToSet method is mongodb update operator is used to update a field value -->

<!-- $push method is mongodb operator is same as js push method while $pull method operator is same as js pop method  -->

<!-- $in operator is used to query for documents where the value of a field equals any value in the specified array
{field:{$in:[value1,value2]}} -->

<!-- example of $in 
db.users.find({role:{$in:["admin","editor"}})   
users ia a database schema including a field value role 
then we get all users including role with either admin or editor-->

<!-- resolve a error tommorow in followinglist widget page -->

<!-- $set vs $addToSet :
$set replaces the whole array with new data entered while addToSet is used to add a new data into existing array . Both are update operators -->

<!-- $or operator is a logical OR operator in mongodb that performs operation on an array of two or more expressions and selects the documents that satisfy at least one of the expressions -->

<!--$elemMatch:this is an operator used to specify conditions on elements in an array field.It ensures that atleast one element in the array meets all the specified conditions  -->

<!-- $eq:it checks whether some condition is equal to value in array -->

<!-- $ne:it checks condition is not equal to something -->

<!-- we direct notification system to follow route etc to send direct notification when action happened -->

<!-- useMemo hook : is used for mrmoizing the value it prevent unusual re renders ,it only change when dependencies changes -->

<!-- useCallback hook is same as the useMemo but it returns the function in response -->