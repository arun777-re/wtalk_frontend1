import { Box } from '@mui/material'
import React from 'react'
import PostFormm from '../component/Form/PostForm'

const PostPage = () => {
  return (
    <Box component={'div'}
    sx={{height:"100%",width:"100%"}}>
      <PostFormm/>
    </Box>
  )
}

export default PostPage
