import React, { Component } from 'react'
import '../styles/error_boundary.css'
export default class ErrorBoundary extends Component {
    constructor(props) {
        super(props)
        this.state = {
            hasError: false
        }
    }
    static getDerivedStateFromError(error) {
        return {
            hasError: true
        }
    }
    
    render() {
        if (this.state.hasError) {
            return (
                <div  className="error">
                    <div className="container">
                        <img src="https://milkandbourbons.com/wp-content/uploads/2018/01/broken-robot.png" alt="broken robot"/>
                        <h1>Oops! Something went wrong</h1>
                        <p>Please wait for a few seconds and refresh the page.</p>
                    </div>
                </div>
            )
        }
        return this.props.children
    }
}
