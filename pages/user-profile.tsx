import React, { FC, ReactElement } from 'react'

type Props = {
  children: ReactElement
  username: string
}

const UserProfilePage: FC<Props> = ({ children, username }) => {
  return (
    <>
      <h1>{username}</h1>
    </>
  )
}

export const getServerSideProps = async (context: any) => {
  const { params, req, res } = context

  return {
    props: {
      username: 'Max'
    }
  }
}

export default UserProfilePage
