import React from 'react'

// react function to get matched element from given components
export const Switch = ({ match, children }: { match: string; children: React.JSX.Element[] }) => children.find(child => child.props.match === match) || null