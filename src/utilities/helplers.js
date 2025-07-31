const randdomStringGenerate = (lent = 100) => {
    const chars = "0123456789abcdefgijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
    let length = chars.length;
    let random = '';

    for (let i = 0; i < length; i++) {
        let position = Math.ceil(Math.random() * (length - 1))
        random += chars[position]
    }
    return random
}

module.exports=randdomStringGenerate