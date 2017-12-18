// Maximum recharge amount
const MAX_RECHARGE_AMOUNT = 100;

// Only three places are needed
const RECHARGE_AMOUNT_PADDING = 3;

// Algorithm methods
const METHOD_STRUCT = 0;
const METHOD_DESTRUCT = 1;

// Some keys for encryption/decryption
const KEYS = ["002b81e698a4df7f64acf5328ab4f10e", "8bdfbe8b1c3c291719623e43f7960fb9" /*, .... more*/];

// A hash table to store cards with info (e.g. used or not used)
var HashTable = new Map();

var LastTimeAdded = 0;
var LastCreatedCardNum;

function Log(cls, message)
{
    $('html, body').animate({scrollTop : 0}, 500);
    $(".logs_wrapper").prepend('<div class="row '+ cls +'">'+ message +'</div>');
}

String.prototype.shuffleCardNumber = function () {
    return (
        // 0        1           2           3
        this[11] + this[6] + this[13] + this[1] +
        // 4        5           6           7
        this[4] + this[0] + this[3] + this[12] +
        // 8        9           10          11
        this[5] + this[7] + this[2] + this[8] +
        // 12       13          14          15
        this[14] + this[10] + this[15] + this[9]
    );
}

String.prototype.resetShuffleCardNumber = function () {
    return (
        // 0        1           2           3
        this[5] + this[3] + this[10] + this[6] +
        // 4        5           6           7
        this[4] + this[8] + this[1] + this[9] +
        // 8        9           10          11
        this[11] + this[15] + this[13] + this[0] +
        // 12       13          14          15
        this[7] + this[2] + this[12] + this[14]
    );
}

function ApplyCardAlgorithm_A(method, num, key)
{
    if(method == METHOD_STRUCT)
    {
        // Apply format preserving encryption
        return twist.encrypt(/[0-9]+/, num, key);
    }
    else if(method == METHOD_DESTRUCT)
    {
        // Apply format preserving decryption
        return twist.decrypt(/[0-9]+/, num, key);
    }
}

function ApplyCardAlgorithm_B(method, num, key)
{
    // a different algorithm...
}

// Determines an algorithm to use based on some factors
function DetermineCardAlgorithm(method, num)
{
    var d = new Date();
    switch(d.getFullYear())
    {
        case 2017:
        {
            if(d.getMonth() >= 6)
            {
                // From July to December, use this algorithm...
                return ApplyCardAlgorithm_A(method, num, KEYS[0]);
            }
            else
            {
                // Another algorithm from January to June...
                return ApplyCardAlgorithm_B(method, num, KEYS[1]);
            }
            break;
        }
        /*

        case 2018:
        {
            // Different algorithms here..
            break
        }
        case 2019 ... and so on

        */
    }
}

// See if a card is valid
function ReadCard(num)
{
    Log("search", "Checking this card whose number is: " + num);

    // Luhn formula test, just to avoid errors
    if(!luhn_Validate(num))
    {
        Log("invalid", "Bad card number");
        return 0;
    }

    // Remove Luhn's check digit
    var numNoCheckDigit = num.slice(0, -1);

    // Reverse the algorithm we applied to get plain number again
    var plainNum = DetermineCardAlgorithm(METHOD_DESTRUCT, numNoCheckDigit);

    // Reset the shuffling to get the origianl number
    var unshuffledNum = plainNum.resetShuffleCardNumber();

    // Parse the string to get recharge amount
    var amount = parseInt(unshuffledNum.slice(0, RECHARGE_AMOUNT_PADDING));

    // Parse the string to get the key/index/timestamp
    var timestamp = parseInt(unshuffledNum.slice(RECHARGE_AMOUNT_PADDING));

    // Check the hash table to see if this card is used or not (status)
    var cardStatus = HashTable.get(timestamp);

    if(cardStatus == false)
    {
        Log("valid", "Found a card with that number. We've recharged you with this amount " + amount);

        // It was not used, now set it as used (true) so nobody will use it anymore
        HashTable.set(timestamp, true);
        return amount;
    }
    else if(cardStatus == true)
    {
        Log("warn", "Found a card with that number, but it's already been used");
        return 0;
    }

    Log("invalid", "Bad card number");
    return 0;
}

// Creates a new card with a specified recharge amount
function RegisterCard(recharge_amount)
{
    // Get current timestamp as our index or key
    var index = Date.now();

    // See if the last added card has the same key
    if(index == LastTimeAdded)
    {
        // Try again in a little
        setTimeout(RegisterCard, 1, recharge_amount);
        return;
    }

    // Apply recharge amount limitations
    if(recharge_amount > MAX_RECHARGE_AMOUNT || recharge_amount <= 0)
    {
        Log("invalid", "Amount cannot be greater than 100 or less than 1");
        return;
    }

    // Convert recharge amount into a string
    var recharge_amount_str = String(recharge_amount);

    // Apply zero padding to recharge amount string
    var recharge_amount_str_padded = recharge_amount_str.padStart(RECHARGE_AMOUNT_PADDING , "0");

    // Convert index/key into a string
    var indexStr = String(index);

    // Combine recharge amount (padded) and key to get our plain number
    var plainNum = recharge_amount_str_padded.concat(indexStr);

    // Shuffle the numbers
    var shuffledNumber = plainNum.shuffleCardNumber();

    // Apply some algorithm (encryption)
    var encryptedNumber = DetermineCardAlgorithm(METHOD_STRUCT, shuffledNumber);

    // Set last added index as current index
    LastTimeAdded = index;

    // Add this index/key to our hash table with a value "false" which means this card is not used yet
    HashTable.set(index, false);

    // Apply Luhn algorithm to avoid errors
    var finalNum = luhn_generate(encryptedNumber);

    // Logging
    Log("create", "Created a new card with this number " + finalNum + " and a recharge amount of " + recharge_amount);

    // Store the created card number, we use it later (for this demo only)
    LastCreatedCardNum = finalNum;
}


// Main function
function main()
{
    Log("info", "Use the input boxes below to create a new card or check one that has already been created");
    /*
    // Create some cards with different recharge values
    RegisterCard(25);
    RegisterCard(45);
    RegisterCard(50);
    RegisterCard(70);
    RegisterCard(35);
    RegisterCard(25);
    RegisterCard(20);

    // Wait a second then check some cards
    setTimeout(function () {
        ReadCard(LastCreatedCardNum);
        ReadCard("4881759144048530");
        ReadCard(LastCreatedCardNum);
    }, 1000);
    */
}

// Fire main function
main();
