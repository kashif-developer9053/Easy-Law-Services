/* eslint-disable jsx-a11y/anchor-is-valid */
import { Avatar, Chip, LinearProgress } from "@material-ui/core";
import React from "react";
import { Card, Col, Row } from "react-bootstrap";
import BtnIcon from "components/Buttons/BtnIcon";
import { Link } from "react-router-dom";
import ChipGroup from "components/Chip/ChipGroup";
import Sticky from "react-stickynode";

function LinearProgressWithLabel(props) {
	const { value, ...other } = props;

	return (
		<Row className="align-items-center g-3">
			<Col>
				<LinearProgress variant="determinate" value={value} {...other} />
			</Col>
			<Col xs="auto">
				<Chip size="small" color="primary" label={`${Math.round(value)}%`} />
			</Col>
		</Row>
	);
}

const Panel1 = () => {

	const side = {
		
		backgroundRepeat: "no-repeat",
		
		color: "white",
		backgroundColor:"#1A181E",
		paddingTop: "10px",
		padding: "20px",
		marginTop: "80px", // Reset margin
	  };
	  const down={
		backgroundColor:"#1A181E",
		color:"white",
	}
	const heading={
		color:"white",
		textAlign:"center",

	}
	const categories = ["Web Development", "Android Development", "UI/UX Design", "WordPress"];

	const chipDelete = () => {
		
		console.info("Chip Delete");
	};

	return (
	
		<>
		
			<Card className="mb-3" style={side}>
				<Card.Body>
					<Row className="justify-content-center">
						<Col xs="auto">
							<div className="user-active p-1">
								<Link to="/profile" className="text-center text-primary my-3">
									<Avatar variant="rounded" alt="User Name" src="" className="large"></Avatar>
								</Link>
							</div>
						</Col>
						<Link to="/profile" className="text-center text-primary my-3">
							User name
						</Link>
					</Row>
					<Row className="align-items-center mb-3">
						<Col>
							<h6>Visibility</h6>
							<i className="fas fa-globe-asia"></i>
							<span className="ms-2">Public</span>
						</Col>
						<Col xs="auto">
							<BtnIcon iconType="edit" />
						</Col>
					</Row>
					<Row className="align-items-center mb-3">
						<Col>
							<h6>Hours</h6>
							<i className="far fa-clock"></i>
							<span className="ms-2">More than 30hrs/week</span>
						</Col>
						<Col xs="auto">
							<BtnIcon iconType="edit" />
						</Col>
					</Row>
					<div className="mb-3">
						<h6>Profile Completion</h6>
						<LinearProgressWithLabel value={50} />
						<a className="text-primary" href="#">
							<i className="fas fa-plus-square"></i>
							<span className="ms-2">Add Testimonial +30%</span>
						</a>
					</div>
					<h6>Proposals</h6>
					<a className="text-primary" href="#">
						50 available connects
					</a>
				</Card.Body>
			</Card>
			<Sticky top="#topNav" innerActiveClass="mt-3" enabled={true} innerZ={1200} bottomBoundary="#main-content">
				<Card style={down}>
					<Card.Body>
						<Row className="align-items-center">
							<Col style={heading} as="h5" className="mb-0">
								Category
							</Col>
							<Col xs="auto">
								<BtnIcon iconType="edit" />
							</Col>
						</Row>
						<div className="mt-3">
							<ChipGroup itemList={categories} size="small" onDelete={chipDelete} />
						</div>
					</Card.Body>
				</Card>
			</Sticky>
		</>
	);
};

export default Panel1;
