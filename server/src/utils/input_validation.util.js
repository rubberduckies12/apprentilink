// Checks if a Postcode is formatted correctly
const validatePostcode = (postcode) => {
    const postcodeRegex = /^[A-Z]{1,2}\d[A-Z\d]? ?\d[A-Z]{2}$/;
    return postcodeRegex.test(postcode);
}

export default validatePostcode;