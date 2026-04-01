document.addEventListener("DOMContentLoaded", () => {
  const sidebar = document.querySelector(".sidebar");
  const toggleBtn = document.querySelector(".toggle-btn");
  const srOnly = toggleBtn ? toggleBtn.querySelector('.sr-only') : null;
  if (!sidebar || !toggleBtn) {
    return;
  }

  const updateButtonState = (collapsed) => {
    toggleBtn.setAttribute("aria-expanded", String(!collapsed));
    toggleBtn.classList.toggle('is-collapsed', collapsed);
    const label = collapsed ? "展开侧边栏" : "收起侧边栏";
    toggleBtn.setAttribute("aria-label", label);
    if (srOnly) srOnly.textContent = label;
  };

  toggleBtn.addEventListener("click", () => {
    const collapsed = sidebar.classList.toggle("collapsed");
    document.body.classList.toggle("sidebar-collapsed", collapsed);
    updateButtonState(collapsed);
  });

  // 初始状态
  updateButtonState(false);

  // 自动检测视频比例并应用相应样式
  const heroVideos = document.querySelectorAll('.hero-video');
  heroVideos.forEach(video => {
    video.addEventListener('loadedmetadata', () => {
      const aspectRatio = video.videoWidth / video.videoHeight;
      // 如果视频是竖屏（高度大于宽度），添加vertical-video class
      if (aspectRatio < 1) {
        video.classList.add('vertical-video');
      }
    });
    // 如果视频已经加载，立即检查
    if (video.readyState >= 1) {
      const aspectRatio = video.videoWidth / video.videoHeight;
      if (aspectRatio < 1) {
        video.classList.add('vertical-video');
      }
    }
  });
});

