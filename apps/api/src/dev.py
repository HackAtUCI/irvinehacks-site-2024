import uvicorn

if __name__ == "__main__":
    uvicorn.run(
        "app:app",
        host="localhost",
        log_level="info",
        access_log=True,
        use_colors=True,
        reload=True,
    )
