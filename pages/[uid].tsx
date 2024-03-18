import { FC } from 'react'

type Props = {
  id: string
}

const UserIdPage: FC<Props> = ({ id }) => {
  return <h1>{id}</h1>
}

export default UserIdPage

export const getServerSideProps = async (context: any) => {
  const { params } = context

  console.log('Server side code ')

  const userId = params.uid

  return {
    props: {
      id: `userid-${userId}`
    }
  }
}
