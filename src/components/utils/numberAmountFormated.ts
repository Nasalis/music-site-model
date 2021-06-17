export const amountAnything = {

    formatNumber(amount: number) {

        const symbols = ["","","mi","bi"]

        const tier = Math.log10(amount) / 3 | 0;
        
        if(tier === 0)
            return amount;

        const sufix = symbols[tier];
        
        const scale = Math.pow(10, tier*3);
        
        const scaled = amount/scale;

        return ((amount > 999999) ? scaled.toFixed(3) : scaled) + " " + sufix;
    },

    fansAmountMessage(fans: number): string {
        return this.formatNumber(fans) + " fans";
    }
}