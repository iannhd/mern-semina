import React from 'react'
import { Breadcrumb, BreadcrumbItem } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const SBreadCrumb = ({textSecond, textThird, urlSecond}) => {
    const navigate = useNavigate()
  return (
    <Breadcrumb className='my-2'>
        <Breadcrumb.Item onClick={() => navigate('/') }>Home</Breadcrumb.Item>
        {!textThird && <Breadcrumb.Item active>{textSecond}</Breadcrumb.Item>}
        {textThird && (
            <Breadcrumb.Item onClick={() => navigate(urlSecond)}>
            {textSecond}
            </Breadcrumb.Item>
        )}
        {textThird && <Breadcrumb.Item active>
            {textThird}
            </Breadcrumb.Item>}
    </Breadcrumb>
  )
}

export default SBreadCrumb