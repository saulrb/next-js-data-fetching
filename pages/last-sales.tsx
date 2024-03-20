import React, { FC, useEffect } from 'react'
import useSWR from 'swr'

type Props = {
  salesParam: any
}

const LastSalesPage: FC<Props> = salesParam => {
  const [sales, setSales] = useState(salesParam)
  // const [isLoading, setIsLoading] = useState(false);

  const { data, error } = useSWR(
    'https://nextjs-course-c81cc-default-rtdb.firebaseio.com/sales.json',
    (url: any) => fetch(url).then(res => res.json())
  )

  useEffect(() => {
    if (data) {
      const transformedSales = []

      for (const key in data) {
        transformedSales.push({
          id: key,
          username: data[key].username,
          volume: data[key].volume
        })
      }

      setSales(transformedSales)
    }
  }, [data])

  if (error) {
    return <p>Failed to load.</p>
  }

  if (!data && !sales) {
    return <p>Loading...</p>
  }

  return (
    <ul>
      {sales.map((sale: any) => (
        <li key={sale.id}>
          {sale.username} - ${sale.volume}
        </li>
      ))}
    </ul>
  )
}

export async function getStaticProps() {
  const response = await fetch('https://nextjs-course-c81cc-default-rtdb.firebaseio.com/sales.json')
  const data = await response.json()

  const transformedSales = []

  for (const key in data) {
    transformedSales.push({
      id: key,
      username: data[key].username,
      volume: data[key].volume
    })
  }

  return { props: { sales: transformedSales } }
}

export default LastSalesPage
