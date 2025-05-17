import pytest
from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_enhance_prompt_success(monkeypatch):
    # Mock OpenAI response
    class MockChoices:
        def __init__(self):
            self.message = type('obj', (object,), {'content': 'Enhanced prompt.'})()
    class MockResponse:
        def __init__(self):
            self.choices = [MockChoices()]
    def mock_create(**kwargs):
        return MockResponse()
    monkeypatch.setattr("openai.chat.completions.create", mock_create)

    response = client.post("/enhance", json={"prompt": "Make this better"})
    assert response.status_code == 200
    assert response.json()["enhanced"] == "Enhanced prompt."

def test_enhance_prompt_missing():
    response = client.post("/enhance", json={})
    assert response.status_code == 200
    assert response.json()["error"] == "Prompt is required."
