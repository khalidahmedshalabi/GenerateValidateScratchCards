# Generate & Validate Scratch Cards
A demo of a scratch cards generator &amp; validator. 

## Use
- Generate scratch cards. Each card can hold a specific value, that can be recharge amount for example, if we're at a company that generates recharge cards for its customers. 
- Validate scratch cards. Validate the cards you generated and check if a card has expired.

## Briefly, how it works
- Card numbers are stored in hash tables for better performance with a key of the current timestamp when a card is generated. Key and card amount are mixed, then shuffled and finally encrypted using Format-perserving Encryption. At the end, Luhn algorithm is applied to the final card number and it's delivered to the customer. 
- Different algorithms and different keys are used based on current date and time which enables us to check expiration.
- For validation, we do the same processes, but in reverse.
