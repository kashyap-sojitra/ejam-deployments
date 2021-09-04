import React, { memo, useEffect, useState } from "react";
import "./Deployments.scss"
import pluralize from "pluralize";
import 'font-awesome/css/font-awesome.min.css';
import HTTPService from "../../services/HTTPService";

function Deployments() {
    const [templateName, setTemplateName] = useState("");
    const [url, setUrl] = useState("");
    const [version, setVersion] = useState("");
    const [deploymentsList, setDeploymentsList] = useState([]);

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        try {
            const response = await HTTPService.get('/deployments/get');
            const {deployments} = response;
            setDeploymentsList(deployments);
        } catch(err) {
            alert("Something went wrong, Please retry!!!");
        }
    }

    const addDeployment = async (event) => {
        event.preventDefault();
        const deploymentData = {
            templateName: templateName,
            url: url,
            version: version
        }
        try {
            await HTTPService.post('/deployments/add', deploymentData);
            alert("Deployment Added Successfully");
            fetchData();
            setTemplateName("")
            setUrl("")
            setVersion("")
        } catch(err) {
            alert("Something went wrong, Please retry!!!");
        }
    }

    const deleteDeployment = async (item) => {
        try {
            await HTTPService.post('/deployments/delete', {id: item._id});
            alert("Deployment Deleted Successfully");
            fetchData();
        } catch(err) {
            alert("Something went wrong, Please retry!!!");
        }
    }

    return (
        <div className="Deployments">
            <div className="form-container">
                <div className="form-header">Add New Deployment</div>
                <form onSubmit={addDeployment}>
                    <div className="form-item">
                        <label className="form-item-label">Template Name</label>
                        <input value={templateName} type="text" id="templateName" onChange={(e) => setTemplateName(e.target.value)} required/>
                    </div>
                    <div className="form-item">
                        <label className="form-item-label">URL</label>
                        <input value={url} type="text" id="url" onChange={(e) => setUrl(e.target.value)} required/>
                    </div>
                    <div className="form-item">
                        <label className="form-item-label">Version</label>
                        <input value={version} type="text" id="version" onChange={(e) => setVersion(e.target.value)} required/>
                    </div>
                    <input type="submit" value="Add Deployment" className="submit-button"/>
                </form>
            </div>

            <div className="deployment-list-container">
                <div className="table-header">{pluralize('Deployment', deploymentsList.length)} List:</div>
                <div className="deployment-item-header row">
                    <div className="header-label">Template Name</div>
                    <div className="header-label">URL</div>
                    <div className="header-label">Version</div>
                    <div className="header-label">Date</div>
                    <div className="header-label">Actions</div>
                </div>
                <div className="table-body">
                {deploymentsList &&
                    deploymentsList.map((item, index) => {
                        return (
                            <div className="row" key={index}>
                                <div className="table-item">{item.templateName}</div>
                                <div className="table-item">{item.url}</div>
                                <div className="table-item">{item.version.join(",")}</div>
                                <div className="table-item">{item.date}</div>
                                <div className="table-item action-item">
                                    <div className="fa fa-trash fa-lg delete-icon" onClick={() => deleteDeployment(item)}></div>
                                </div>
                            </div>
                        )
                    })
                }
                </div>
            </div>
        </div>
    )
}

export default memo(Deployments);