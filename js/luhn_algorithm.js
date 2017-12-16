function luhn_Validate(numStr)
{
    if (/[^0-9-\s]+/.test(numStr))
        return false;

    var sum = 0, atHand, multiply = false;
    //numStr = numStr.replace(/\D/g, "");

    for(var i = (numStr.length - 1); i != -1; -- i)
    {
        atHand = parseInt(numStr[i], 10);

        if(multiply)
        {
            if((atHand *= 2) > 9)
                atHand -= 9;
        }

        sum += atHand;
        multiply = !multiply;
    }

    return (sum % 10) == 0;
}

function luhn_GetCheckDigit(inputNumber)
{
    var sum = 0, atHand, multiply = true;
    for(var i = (inputNumber.length - 1); i != -1; -- i)
    {
        atHand = parseInt(inputNumber[i], 10);
        if(multiply)
        {
            if((atHand *= 2) > 9)
                atHand -= 9;
        }

        sum += atHand;
        multiply = !multiply;
    }

    if((sum % 10) == 0)
    {
        return "0";
    }
    return String(10 - (sum % 10));
}

function luhn_generate(inputNumber)
{
    return (
        inputNumber + luhn_GetCheckDigit(inputNumber)
    );
}
