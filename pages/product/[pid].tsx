import fs from 'fs'
import path from 'path'

import Product from '~/data/product'
import { FC, Fragment, ReactElement } from 'react'
import { notFound } from 'next/navigation'

type Props = {
  loadedProduct?: Product
  children?: ReactElement
}

const getData = async () => {
  const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json')
  const jsonData = fs.readFileSync(filePath, 'utf-8')
  const data = JSON.parse(jsonData)
  return data.products
}
export const getStaticPaths = async () => {
  const data = await getData()
  const ids = data.map((product: any) => product.id)
  const params = ids.map((id: any) => ({ params: { pid: id } }))

  return {
    paths: params,
    fallback: true //  false | true|'blocking'
  }
}

export const getStaticProps = async (context: any) => {
  const { params } = context
  const productId = params.pid
  const productsArr = await getData()
  const productFound = productsArr.find((product: any) => product.id === productId)

  if (!productFound) {
    return {
      notFound: true
    }
  }

  return {
    props: {
      loadedProduct: productFound
    }
  }
}

const ProductDetailPage: FC<Props> = ({ loadedProduct }) => {
  // Fall back == true
  if (!loadedProduct) {
    return <p>Loading ... </p>
  }
  return (
    <Fragment>
      <h1>{loadedProduct.title}</h1>
      <p>{loadedProduct.description}</p>
    </Fragment>
  )
}

export default ProductDetailPage
