import React from 'react'
import ContentLoader from 'react-content-loader'

const Youtube = props => (
  <ContentLoader viewBox="0 0 500 420" height={450} width={500}  backgroundColor="#c6c6c6" {...props}>
    <rect x="16" y="37" rx="0" ry="0" width="360" height="300" />
    <rect x="69" y="360" rx="2" ry="2" width="275" height="15" />
    <rect x="69" y="410" rx="2" ry="2" width="140" height="15" />
  </ContentLoader>
)


export default Youtube