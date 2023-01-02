import * as React from 'react'
import ReactDOM from 'react-dom/client';

const App = () => (<div>
    <h1>foo bar baz</h1>
</div>)

const root = ReactDOM.createRoot(
    document.getElementById('root')
);
root.render(<App />);