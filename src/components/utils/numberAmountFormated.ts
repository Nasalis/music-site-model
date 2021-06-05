export const amountAnything = {

    formatNumber(amount: number) {

        const tier = Math.log10(amount) / 3 | 0;
        
        if(tier === 0)
            return amount;
        
        const scale = Math.pow(10, tier*3);
        
        const scaled = amount/scale;

        return scaled;
    },

    fansAmountMessage(fans: number): string {
        return this.formatNumber(fans) + " fans";
    }
}