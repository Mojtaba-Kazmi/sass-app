import { stripe } from "src/pricing/utils/stripe";

export default function PricingPage({ plans }) {
    console.log(plans)
}

export async function getStaticProps() {
    const {data: prices} = await stripe.prices.list()
    const plans = []

    for(const price of prices) {
        const product = await stripe.products.retrieve(price.product);

        plans.push({
            id: product.id,
            name: product.name,
            price: price.unit_amount/ 100,
            interval: price.recurring.interval
        })
    }
    return {
        props: {
            plans
        }
    }
}