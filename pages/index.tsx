import fs from 'fs'
import path from 'path'

import { Inter } from 'next/font/google'
import Product from '~/data/product'
import { FC, ReactElement } from 'react'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

type Props = {
  products?: Product[]
  children?: ReactElement
}

export const getStaticProps = async () => {
  // const productsArr: Product[] = dummyData
  console.log('Re-Generating...')
  const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json')
  const jsonData = fs.readFileSync(filePath, 'utf-8')
  const data = JSON.parse(jsonData)

  return {
    props: {
      products: data.products
    },
    revalidate: 10,
    redirect: '/someotherpage'
  }
}

const Home: FC<Props> = ({ products }) => {
  if (!products || products.length === 0) {
    return <p>No products to show in this moment</p>
  }
  return (
    <div>
      <ul>
        {products.map(prod => (
          <li key={prod.id}>
            <Link href={`/product/${prod.id}`}>{prod.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Home
