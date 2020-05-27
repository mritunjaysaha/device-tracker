import React, { Component } from "react";
import axios from "axios";

export default class CreateDevice extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            devicename: "",
            devicemac: "",
            users: [],
        };

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeDeviceName = this.onChangeDeviceName.bind(this);
        this.onChangeDeviceMac = this.onChangeDeviceMac.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        axios.get("http://localhost:8000/users").then((res) => {
            if (res.data.length > 0) {
                this.setState({
                    users: res.data.map((user) => user.username),
                    username: res.data[0].username,
                });
            }
        });
    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value,
        });
    }

    onChangeDeviceName(e) {
        this.setState({
            devicename: e.target.value,
        });
    }

    onChangeDeviceMac(e) {
        this.setState({
            devicemac: e.target.value,
        });
    }
    onSubmit(e) {
        e.preventDefault();

        const device = {
            username: this.state.username,
            devicename: this.state.devicename,
            devicemac: this.state.devicemac,
        };

        console.log(device);

        axios
            .post("http://localhost:8000/devices/add", device)
            .then((res) => console.log(res.data));
        window.location = "/";
    }

    render() {
        return (
            <div>
                <h3>Create new Device log</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username: </label>
                        <select
                            ref="userInput"
                            required
                            className="form-control"
                            value={this.state.username}
                            onChange={this.onChangeUsername}
                        >
                            {this.state.users.map(function (user) {
                                return (
                                    <option key={user} value={user}>
                                        {user}
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="devicename">Device name</label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.duration}
                            onChange={this.onChangeDeviceName}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="devicename">mac Address</label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.duration}
                            onChange={this.onChangeDeviceMac}
                        />
                    </div>
                    <div className="for-group">
                        <input
                            type="submit"
                            value="device log"
                            className="btn btn-primary"
                        />
                    </div>
                </form>
            </div>
        );
    }
}
