import React from 'react';

export default class DataTable extends React.Component {

    render() {
        return (
            <div>
                <h1>New posts</h1>
                <table>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Post</th>
                    </tr>
                    </thead>
                    <tbody>
                        {this.props.data ? this.props.data.map((item) => {
                            return (
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.body}</td>
                                </tr>
                            )
                        }) : null}
                    </tbody>
                </table>
            </div>
        )
    }

}