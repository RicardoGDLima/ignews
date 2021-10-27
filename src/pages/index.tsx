import { GetStaticProps } from 'next'

import Head from 'next/head'
import { SubscribeButon } from '../components/SubscribeButton'
import { stripe } from '../services/stripe'

import styles from './home.module.scss'

interface HomeProps {
  product: {
    priceId: string;
    amount: number;
  }
}

export default function Home({product}: HomeProps) {
  return (
    <>
   
      <Head>
        <title>Home | ig.news</title>
      </Head>
     <main className={styles.contentContainer}>
       <section className={styles.hero}>
          <span>👏 Hey, welcome</span>
          <h1>News about the <br /> <span>React</span> world.</h1>
          <p>
            Get access to all the publications <br />
            <span>for {product.amount} month</span>
            
          </p>
          <SubscribeButon priceId={product.priceId}/>
       </section>     
       <img src="/images/avatar.svg" alt="Gril coding" />
     </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const price = await stripe.prices.retrieve('price_1JozBZKjsbY4kSlh4BuKKqpZ', {
    expand: ['product']
  }) 

  const product = {
    priceId: price.id,
    amount: new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price.unit_amount / 100), // para salvar em centavos (evitando o trabalho com casas decimais)
  };

  return {
    props: {
      product
    },
    revalidate: 60 * 60 * 24, // a cada 24 horas
  }

}