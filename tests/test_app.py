"""
Tests for Flask application startup and API endpoints.
"""

import pytest
from app import create_app

@pytest.fixture
def client():
    app = create_app({"TESTING": True})
    with app.test_client() as client:
        yield client

def test_health_check(client):
    response = client.get("/api/health")
    assert response.status_code == 200
    data = response.get_json()
    assert data["status"] == "healthy"
    assert "AI Learning Capstone" in data["service"]

def test_sample_state_endpoint(client):
    response = client.get("/api/sample")
    assert response.status_code == 200
    data = response.get_json()
    assert "studentInfo" in data
    assert "chapter" in data
    assert len(data["chapter"]["sections"]) == 10
    assert len(data["sources"]) >= 2
    assert len(data["promptLog"]) >= 8
    assert len(data["factChecks"]) >= 6

def test_validate_endpoint_incomplete(client):
    empty_state = {"studentInfo": {}}
    response = client.post("/api/validate", json=empty_state)
    assert response.status_code == 200
    data = response.get_json()
    assert data["status"] == "CAPSTONE IN PROGRESS"
    assert data["isComplete"] is False
    assert data["percentage"] < 100

def test_validate_endpoint_sample_complete(client):
    sample_resp = client.get("/api/sample")
    sample_data = sample_resp.get_json()
    response = client.post("/api/validate", json=sample_data)
    assert response.status_code == 200
    data = response.get_json()
    assert data["status"] == "CAPSTONE COMPLETE"
    assert data["isComplete"] is True
    assert data["percentage"] == 100

def test_export_markdown_endpoint(client):
    sample_resp = client.get("/api/sample")
    sample_data = sample_resp.get_json()
    response = client.post("/api/export/markdown", json=sample_data)
    assert response.status_code == 200
    data = response.get_json()
    assert "markdown" in data
    assert "# AI Learning Capstone" in data["markdown"]
    assert "## Student Information" in data["markdown"]
    assert "## Topic Brief" in data["markdown"]
    assert "## Chapter" in data["markdown"]
